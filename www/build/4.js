webpackJsonp([4],{

/***/ 442:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PhotoListPageModule", function() { return PhotoListPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__photo_list__ = __webpack_require__(451);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PhotoListPageModule = (function () {
    function PhotoListPageModule() {
    }
    PhotoListPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__photo_list__["a" /* PhotoListPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__photo_list__["a" /* PhotoListPage */]),
            ],
        })
    ], PhotoListPageModule);
    return PhotoListPageModule;
}());

//# sourceMappingURL=photo-list.module.js.map

/***/ }),

/***/ 451:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PhotoListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_event_event__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_email_composer__ = __webpack_require__(278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_homework_homework__ = __webpack_require__(277);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the PhotoListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PhotoListPage = (function () {
    function PhotoListPage(camera, emailComposer, alertCtrl, navCtrl, navParams, eventProvider, homeworks) {
        this.camera = camera;
        this.emailComposer = emailComposer;
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.eventProvider = eventProvider;
        this.homeworks = homeworks;
        this.galleryType = 'regular';
        this.photoList = [];
        this.currentImage = null;
    }
    PhotoListPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        console.log('photo list');
        var student_id = this.navParams.get('student_id');
        console.log(student_id);
        this.homeworks.getHomeWorks(student_id).on('value', function (snapshot) {
            _this.photoList = [];
            snapshot.forEach(function (snap) {
                _this.photoList.push({
                    id: snap.key,
                    name: snap.val().name,
                    picture: snap.val().picture,
                });
                console.log(_this.photoList);
                return false;
            });
            console.log(_this.photoList);
        });
    };
    //go to the Add Photo Page
    PhotoListPage.prototype.goToAddPhoto = function () {
        this.navCtrl.push('AddPhotoPage');
    };
    PhotoListPage.prototype.deletePhoto = function (index) {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: "Sure you want to delete this photo? There is NO undo!",
            message: "",
            buttons: [
                {
                    text: "No",
                    handler: function () {
                        console.log("Disagree clicked");
                    }
                },
                {
                    text: "Yes",
                    handler: function () {
                        console.log("Agree clicked");
                        _this.photoList.splice(index, 1);
                    }
                }
            ]
        });
        confirm.present();
    };
    PhotoListPage.prototype.captureImage = function () {
        var _this = this;
        var options = {
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: this.camera.DestinationType.FILE_URI,
        };
        this.camera.getPicture(options).then(function (imageData) {
            _this.currentImage = imageData;
        }, function (err) {
            // Handle error
            console.log('Image error: ', err);
        });
    };
    PhotoListPage.prototype.sendEmail = function () {
        var email = {
            to: 'duaa.alwad@gmail.com',
            cc: 'duaa.taani@yahoo.com',
            attachments: [
                this.currentImage
            ],
            subject: 'Homework',
            body: 'Hey , this is the hw',
            isHtml: true
        };
        this.emailComposer.open(email);
    };
    PhotoListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-photo-list',template:/*ion-inline-start:"/home/alysdev/Área de Trabalho/ProfessorApp/src/pages/photo-list/photo-list.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Image Gallery\n    </ion-title>\n\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding float-right>\n  <button ion-button block clear (click)="goToResetPassword()">\n    Select\n  </button>\n\n  <div [ngSwitch]="galleryType">\n    <!-- Responsive Layout with Ion Grid-->\n    \n\n    <ion-grid>\n      <ion-row>\n        <ion-col col-6 *ngFor="let image of photoList">\n          <ion-card class="block">\n              <ion-checkbox class="image-container" [style.background-image]="\'url(assets/img/\' + image + \'.jpg)\'"></ion-checkbox>\n            <ion-icon name="trash" class="deleteIcon" (click)="deletePhoto(id)"></ion-icon>\n            <img [src]="image.picture"/>\n          </ion-card>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n\n    <ion-card *ngFor="let pic of photoList" >\n      <ion-item>\n        <h1>{{pic?.name}}</h1>\n          <ion-thumbnail item-left>\n            <img src={{pic?.picture}} >\n          </ion-thumbnail>    \n      </ion-item>\n    </ion-card>\n\n\n    <button ion-button full (click)="captureImage()">Capture Image</button>\n    <button ion-button full (click)="sendEmail()">Send Email</button>\n\n    <ion-card>\n      <ion-card-header>Current image</ion-card-header>\n      <ion-card-content>\n        <img [src]="currentImage" *ngIf="currentImage" />\n      </ion-card-content>\n    </ion-card>\n    <!-- More Pinterest floating gallery style -->\n\n  </div>\n\n\n\n\n\n\n\n\n</ion-content>'/*ion-inline-end:"/home/alysdev/Área de Trabalho/ProfessorApp/src/pages/photo-list/photo-list.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_email_composer__["a" /* EmailComposer */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_event_event__["a" /* EventProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_homework_homework__["a" /* HomeworkProvider */]])
    ], PhotoListPage);
    return PhotoListPage;
}());

//# sourceMappingURL=photo-list.js.map

/***/ })

});
//# sourceMappingURL=4.js.map