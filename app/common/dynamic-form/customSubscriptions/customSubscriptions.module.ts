import { InjectionToken } from '@angular/core';

import {ChangeSubscriptions} from "./changeSubscriptions";

export const CHANGE_SUBSCRIPTIONS: InjectionToken<(Function | ChangeSubscriptions)[]> = new InjectionToken<(Function | ChangeSubscriptions)[]>('CustomSubscriptions');
