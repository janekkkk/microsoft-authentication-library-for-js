import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component'
import {ProductComponent} from './product/product.component'
import {ErrorComponent} from './error.component'
import {ProductDetailComponent} from './product/product-detail.component'
import {ProductService} from './product/product.service';
import {appRoutes} from './app.routes';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MsalModule} from "@azure/msal-angular";
import { MsalInterceptor} from "@azure/msal-angular";
import {LogLevel} from "msal";
import { TodoListComponent } from './todo-list/todo-list.component';
import {TodoListService} from "./todo-list/todo-list.service";
import {UserDataComponent} from "./user-data/user-data.component";
import { HttpServiceHelper } from './common/HttpServiceHelper';

export function loggerCallback(logLevel, message, piiEnabled) {
  console.log("client logging" + message);
}

// string[] SCOPES = { "https://{myB2CTenant}.onmicrosoft.com/b2capp2/note_read", "https://{myB2CTenant}.onmicrosoft.com/b2capp2/user_impersonation" };

// export const protectedResourceMap:[string, string[]][]=[ ['https://buildtodoservice.azurewebsites.net/api/todolist',['api://a88bb933-319c-41b5-9f04-eff36d985612/access_as_user']] , ['https://graph.microsoft.com/v1.0/me', ['user.read']] ];

const config = {
  tenant: 'omons.b2clogin.com',
  authority: 'omons.onmicrosoft.com',
  clientID: '2219a808-668a-4cc5-a1e6-f75038e28e33',
  policy: 'b2c_1_omonsprivate',
}

console.log(`https://${config.tenant}/tfp/${config.authority}/${config.policy}`)

@NgModule({
  declarations: [
    AppComponent, HomeComponent, ProductComponent, ErrorComponent, ProductDetailComponent, TodoListComponent, UserDataComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes,{useHash:true}) ,
    MsalModule.forRoot({
      clientID: '2219a808-668a-4cc5-a1e6-f75038e28e33',
      authority: `https://${config.tenant}/tfp/${config.authority}/${config.policy}`,
        validateAuthority: false,
      //   redirectUri: "http://localhost:4200/",
      //   cacheLocation : "localStorage",
      //   postLogoutRedirectUri: "http://localhost:4200/",
      //   navigateToLoginRequestUrl: true,
      //   popUp: false,
      // consentScopes: ["user.read", "user_impersonation"],
      //   unprotectedResources: ["https://www.microsoft.com/en-us/"],
      //   protectedResourceMap: null,
      //   logger: loggerCallback,
      //   correlationId: '1234',
      //   level: LogLevel.Info,
      //   piiLoggingEnabled: true,
            }
    ),
  ],
  providers: [ProductService, TodoListService, HttpServiceHelper,
     {provide: HTTP_INTERCEPTORS, useClass: MsalInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
