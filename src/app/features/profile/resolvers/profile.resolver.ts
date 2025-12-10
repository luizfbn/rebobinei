import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Profile } from '../../../core/user/models/profile.model';
import { UserService } from '../../../core/user/services/user.service';

export const profileResolver: ResolveFn<Profile> = (route, state) => {
    const userService = inject(UserService);
    const userId = route.paramMap.get('id')!;
    return userService.getProfile(userId);
};
