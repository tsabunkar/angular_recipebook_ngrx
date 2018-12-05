import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';

import { RecipeService } from '../../recipe/recipe-service/recipe.service';
import { Recipe } from '../../recipe/models/recipe.model';

import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../../auth/auth-service/auth-service.service';


@Injectable()
export class RecipeStorageBackendService {
    // This service is used to fetch and post the data from/to the backend server
    // we r using backend server as firebase (which has builitn database to persist our data)
    constructor(private httpClient: HttpClient,
        private recipeService: RecipeService,
        private authService: AuthService
    ) { }

    url = 'https://ng-recipe-book-4712d.firebaseio.com/recipes.json';

    authUrl = 'https://ng-recipe-book-4712d.firebaseio.com/recipes.json?auth=';

    authUrlWithoutQueryParams = 'https://ng-recipe-book-4712d.firebaseio.com/recipes.json';




    // Both POST & PUT (bcoz- firebase server is smart enough to create new record if sending
    // data for first time, update exisiting record if sending exisitng data)
    /*  storeRecipe2(): Observable<void | Recipe[]> {

         const currentTokenValue = this.authService.getToken();

         const payload: Recipe[] = this.recipeService.getRecipe();

         // put u can perform both post(create new) and put(update existing data)
         return this.httpClient.put<Recipe[]>(this.authUrl + currentTokenValue, payload, { // !HardCodingQueryParam
             observe: 'body',
             // headers : new HttpHeaders().set('Authorization', 'auth token').append('Auth2', 'add another header value')
             // ? way to set headers in HttpClient for put http request call

         })
             // !we r specifiying that put request must
             // !return me <Recipe[]> data type, Rather than specifiying in the map() methods argument
             .pipe(
                 map((responseData) => {
                     // * map((responseData : Recipe[]) -> no need to specifiy the data type bcoz already specified at-> put<Recipe[]>
                     console.log(responseData);
                     return responseData;
                     // !This return -bcoz-> while subscribe(ing) this Observable type
                     // !I specifically need Recipe[] datatype
                 }),
                 catchError(err => {
                     this.handlerError(err);
                     throw err;
                 })
             );

     } */



    // ! ----------------------------------------------------------------------------------------------
    // Using parmas rather than hardcoding as in the above code
    /*  storeRecipe4(): Observable<void | Recipe[]> {

         const currentTokenValue = this.authService.getToken();

         const payload: Recipe[] = this.recipeService.getRecipe();

         // put u can perform both post(create new) and put(update existing data)
         return this.httpClient.put<Recipe[]>(this.authUrlWithoutQueryParams, payload, { // ! NotHardCodingQueryParams
             observe: 'body',
             // headers : new HttpHeaders().set('Authorization', 'auth token').append('Auth2', 'add another header value')
             // ? way to set headers in HttpClient for put http request call
             params: new HttpParams().set('auth', currentTokenValue)  // ! Insteasd of hardcoding the queryParams, we r setting it
         })
             // !we r specifiying that put request must
             // !return me <Recipe[]> data type, Rather than specifiying in the map() methods argument
             .pipe(
                 map((responseData) => {
                     // * map((responseData : Recipe[]) -> no need to specifiy the data type bcoz already specified at-> put<Recipe[]>
                     console.log(responseData);
                     return responseData;
                     // !This return -bcoz-> while subscribe(ing) this Observable type
                     // !I specifically need Recipe[] datatype
                 }),
                 catchError(err => {
                     this.handlerError(err);
                     throw err;
                 })
             );

     } */


    // ! ----------------------------------------------------------------------------------------------
    // ! Progress Event (showing progress bar when making backend call) & making http request as generic
    /*  storeRecipe3() {

         const currentTokenValue = this.authService.getToken();

         const payload: Recipe[] = this.recipeService.getRecipe();

         const reqVal = new HttpRequest<Recipe[]>('PUT', this.authUrlWithoutQueryParams, payload,
             {
                 params: new HttpParams().set('auth', currentTokenValue),
                 reportProgress: true // report Progress -> gives the feedback about the progress of this http request and response
                 // useful while uploading and downloading
             });

         return this.httpClient.request(reqVal);

     } */



    // ! ----------------------------------------------------------------------------------------------
    // !Using Interceptors and removing the auth query params, as it is set in auth.interceptor.ts
    storeRecipe() {

        // const currentTokenValue = this.authService.getToken();

        const payload: Recipe[] = this.recipeService.getRecipe();

        const reqVal = new HttpRequest<Recipe[]>('PUT', this.authUrlWithoutQueryParams, payload,
            {
                // params: new HttpParams().set('auth', currentTokenValue),
                reportProgress: true
            });

        return this.httpClient.request(reqVal);

    }




    // ! ----------------------------------------------------------------------------------------------
    // GETALL
    getAllRecipe(): Observable<void> {
        // sending the gellAll http request will fail bcoz we have changed the firebase db rule i.e-
        // request which has token value can only perform read and write on the firebase db
        // !getting the token from firebase sdk and then sending the token in the header of gellAll http request

        // const currentTokenValue = this.authService.getToken(); // !instead os settign token , we are
        // !setting the token value in the HTTP Interceptor using NgRX


        // .get<Recipe[]> -> Recipes[] is the return data type we expect from this GET Http request, this is called -typed request
        // ! 2nd optional argument we can pass is js object,
        // ! observe:- data/value returned for this HTTP Call which can be 'headers', 'body', 'response'
        // ! responseType:- data-type of returned response for this HTTP call which can be 'json', text, blob, 'arraybuffer'
        // return this.httpClient.get<Recipe[]>(this.authUrl + currentTokenValue, { observe: 'body', responseType: 'json' })
        return this.httpClient.get<Recipe[]>(this.url, { observe: 'body', responseType: 'json' })
            .pipe(
                map((responseData) => {
                    let recipesArray: Recipe[] = responseData;
                    if (recipesArray !== null) {
                        for (const recipeObj of recipesArray) {
                            if (!recipeObj['ingredients']) { // check if each recipe object has ingredients property
                                // (if not then add this property with empty array)
                                console.log(recipeObj);
                                recipeObj['ingredients'] = [];
                            }
                        }

                        this.recipeService.setRecipesArray(recipesArray);
                        // !updating the recipeArray which is present in recipeService class
                        console.log(recipesArray);
                        // return responseData;
                    } else {
                        recipesArray = [];
                    }
                }),
                catchError(err => {
                    this.handlerError(err);
                    throw err;
                })
            );
    }

    handlerError(err: any) {
        console.log('error has occured bro:', err);
        return err;
    }



}
