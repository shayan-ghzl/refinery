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
      (user.firstName + user.lastName + user.nationalId + user.education + user.age + user.birthDate).toLowerCase().includes(key)
    );
  }

}
