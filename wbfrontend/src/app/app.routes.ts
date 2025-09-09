import { Routes } from '@angular/router';
import { Registration } from './registration/registration';
import { Login } from './login/login';
import { Adminpanel } from './adminpanel/adminpanel';
import { IndexPage } from './home/index-page/index-page';
import { CanvasView } from './whiteboard/canvas-view/canvas-view';

export const routes: Routes = [
    {path:'register', component: Registration},
    {path:'login', component: Login},
    {path: 'adminpanel', component: Adminpanel},
    {path: 'cnv/:id', component: CanvasView},
    {path: '',component: IndexPage}
];
