// Módulos do Angular
import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Outros Módulos
//import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { FileUploadModule } from 'ng2-file-upload/file-upload/file-upload.module';
import { NgxMaskModule } from 'ngx-mask';
import { QuillModule } from 'ngx-quill';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { ToastrModule } from 'ngx-toastr';

// Componentes
import { AppComponent } from './app.component';

// Configurações
import { routes } from './app.routes';
import { environment } from 'environments/environment';

// Páginas
import { MainComponent } from './pages/main/main.component';
import { DashComponent } from './parts/dash/dash.component';
import { LoginComponent } from './pages/security/login/login.component';
import { LogoutComponent } from './pages/security/logout/logout.component';

// Angular Modules
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './providers/core/core.module';
import { LoadingComponent } from './components/loading/loading.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashComponent,
    MainComponent,
    LogoutComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,   
    CoreModule,
    SharedModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseAppConfig),
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    NgxMaskModule.forRoot(),
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    BootstrapModalModule,
    FileUploadModule,
    QuillModule
    //ChartsModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(applicationRef: ApplicationRef) {
    Object.defineProperty(applicationRef, '_rootComponents', { get: () => applicationRef['components'] });
  }
}
