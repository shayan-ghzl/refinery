import { computed, Injectable, signal } from '@angular/core';
import { User } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class States {
  private users = signal<User[]>([
    {
      id: 1,
      firstName: 'shayan',
      lastName: 'ghazali',
      age: 32,
      education: 'computer',
      nationalId: '1271508338',
      birthDate: '1372/07/07',
    },
  ]);

  private nextId = computed(() => {
    const users = this.users();
    if (users.length === 0) return 1;
    const maxId = Math.max(...users.map(u => u.id));
    return maxId + 1;
  });

  getUsers() {
    return this.users.asReadonly();
  }

  addItem(newUser: Omit<User, 'id'>) {
    this.users.update(items => [...items, { ...newUser, id: this.nextId() }]);
  }

  removeItem(user: User) {
    this.users.update(items => items.filter(item => item.id !== user.id));
  }

  clearItems() {
    this.users.set([]);
  }
}
