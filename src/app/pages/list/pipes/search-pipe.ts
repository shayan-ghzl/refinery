import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../../../shared/models/models';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(users: User[], searchKey: string): User[] {
    if (users.length === 0 || !searchKey) {
      return users;
    }

    const key = searchKey.toLowerCase().trim();

    return users.filter(user =>
      user.firstName.toLowerCase().includes(key) ||
      user.lastName.toLowerCase().includes(key) ||
      user.nationalId.toLowerCase().includes(key) ||
      user.education.toLowerCase().includes(key) ||
      user.profile.toLowerCase().includes(key) ||
      user.age.toString().includes(key) ||
      user.birthDate.toLowerCase().includes(key)
    );
  }

}
