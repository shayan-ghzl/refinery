import { computed, effect, Injectable, signal } from '@angular/core';
import { User } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class States {
  private users = signal<User[]>([

  ]);

  private nextId = computed(() => {
    const users = this.users();
    if (users.length === 0) return 1;
    const maxId = Math.max(...users.map(u => u.id));
    return maxId + 1;
  });

  constructor() {
    try {
      const saved = localStorage.getItem('users');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          this.users.set(parsed);
        }
      }
    } catch (error) {
      console.error('Error loading users from localStorage:', error);
    }

    effect(() => {
      const currentUsers = this.users();
      localStorage.setItem('users', JSON.stringify(currentUsers));
    });
  }

  getUsers() {
    return this.users.asReadonly();
  }

  addItem(newUser: Omit<User, 'id'>) {
    this.users.update(items => [...items, { ...newUser, id: this.nextId() }]);
  }

  removeItem(user: User) {
    this.users.update(items => items.filter(item => item.id !== user.id));
  }

  editItem(updatedUser: User) {
    this.users.update(items =>
      items.map(item =>
        item.id === updatedUser.id ? { ...item, ...updatedUser } : item
      )
    );
  }

  clearItems() {
    this.users.set([]);
  }
}
