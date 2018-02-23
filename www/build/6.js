webpackJsonp([6],{

/***/ 439:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventDetailPageModule", function() { return EventDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__event_detail__ = __webpack_require__(448);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var EventDetailPageModule = (function () {
    function EventDetailPageModule() {
    }
    EventDetailPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__event_detail__["a" /* EventDetailPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__event_detail__["a" /* EventDetailPage */]),
            ],
        })
    ], EventDetailPageModule);
    return EventDetailPageModule;
}());

//# sourceMappingURL=event-detail.module.js.map

/***/ }),

/***/ 448:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_event_event__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_homework_homework__ = __webpack_require__(277);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var EventDetailPage = (function () {
    function EventDetailPage(loadingCtrl, camera, navCtrl, navParams, eventProvider, cameraPlugin, homeWorks) {
        this.loadingCtrl = loadingCtrl;
        this.camera = camera;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.eventProvider = eventProvider;
        this.cameraPlugin = cameraPlugin;
        this.homeWorks = homeWorks;
        this.currentEvent = {};
        this.currenthomework = {};
        this.homeworkName = '';
        this.homeworkPicture = null;
    }
    EventDetailPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log(this.homeWorks.student_id);
        this.student_id = this.navParams.get('eventId');
        this.eventProvider
            .getEventDetail(this.navParams.get('eventId'))
            .on('value', function (eventSnapshot) {
            _this.currentEvent = eventSnapshot.val();
            _this.currentEvent.id = eventSnapshot.key;
        });
    };
    EventDetailPage.prototype.takePicture = function () {
        var _this = this;
        this.cameraPlugin
            .getPicture({
            quality: 100,
            targetHeight: 200,
            targetWidth: 200,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        })
            .then(function (imageData) {
            _this.homeworkPicture = imageData;
        }, function (error) {
            console.log("ERROR -> " + JSON.stringify(error));
        });
    };
    EventDetailPage.prototype.gotophoto = function () {
        this.homeWorks.student_id = this.student_id;
        this.navCtrl.push('PhotoListPage', {
            student_id: this.student_id
        });
    };
    EventDetailPage.prototype.addhomework = function (homeworkName) {
        var _this = this;
        this.eventProvider.addhomework(homeworkName, this.currentEvent.id, this.homeworkPicture).then(function (newhomework) {
            _this.homeworkName = "";
            _this.homeworkPicture = null;
        });
    };
    EventDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-event-detail',template:/*ion-inline-start:"/home/alysdev/Área de Trabalho/ProfessorApp/src/pages/event-detail/event-detail.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Homework Page</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <ion-card>\n    <h1>Student Name : {{currentEvent?.name}}</h1>\n    <ion-card-content>\n    </ion-card-content>\n  </ion-card>\n  \n\n  \n  <ion-card class="add-homework-form">\n    <ion-card-header>\n      Add Homework\n    </ion-card-header>\n    <ion-card-content>\n      <ion-row>\n        <ion-col col-8>\n          <ion-item>\n            <ion-label stacked>Name</ion-label>\n            <ion-input [(ngModel)]="homeworkName" type="text" placeholder="What\'s your homework\'s name?"></ion-input>\n          </ion-item>\n        </ion-col>\n\n        <ion-col col-4>\n          <button ion-button icon-only (click)="takePicture()">\n            <ion-icon name="camera"></ion-icon>\n          </button>\n        </ion-col>\n      </ion-row>\n      <span *ngIf="homeworkPicture">Picture taken!</span>\n      <button ion-button color="primary" block (click)="addhomework(homeworkName)" [disabled]="!homeworkName">\n        Add Homework\n      </button>\n    </ion-card-content>\n  </ion-card>\n  <img src={{imgurl}}>\n  <ion-card-content>\n    <ion-list no-lines>\n      <button ion-button color="primary" block (click)=" gotophoto()"> List of Homework </button>\n    </ion-list>\n  </ion-card-content>\n  \n  \n\n\n</ion-content>'/*ion-inline-end:"/home/alysdev/Área de Trabalho/ProfessorApp/src/pages/event-detail/event-detail.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_event_event__["a" /* EventProvider */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_4__providers_homework_homework__["a" /* HomeworkProvider */]])
    ], EventDetailPage);
    return EventDetailPage;
}());

//# sourceMappingURL=event-detail.js.map

/***/ })

});
//# sourceMappingURL=6.js.map