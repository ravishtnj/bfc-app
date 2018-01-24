import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { FormControl, FormGroup, AbstractControl, FormBuilder, Validators ,RadioControlValueAccessor,CheckboxControlValueAccessor} from '@angular/forms';
import {BFCServices} from '../../Services/BFCServices';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

loginModel:any;
registrationModel:any;
activationModel:any;
loginForm:FormGroup;
registrationForm:FormGroup;
loginUser = {};
loginUserProfile={};
userLoggedIn:boolean = false;
regSuccesful=false;
rememberMe=false;

@Output ('loginUserDataEmit') loginUserData = new EventEmitter<any>();

  constructor(private bfcService:BFCServices,private formBuilder: FormBuilder) {

   }

  ngOnInit() {

    this.loginForm= this.formBuilder.group({
      mobileNumber:[''],
      password:['']
    });

    this.registrationForm = this.formBuilder.group({
      userName:[''],
      newEmail:[''],
      newMobile:[''],
      newpwd:[''],
      regMobile:[''],
      otp:['']
    });

    this.loginModel={
        "mobileNumber":"",
        "password":""
    }

    this.registrationModel ={
    "fullName":"",
    "emailAddress":"",
    "mobileNumber":"",
    "password":""
    }

    this.activationModel={
      "mobileNumber":"",
      "otp":""
    }
  }

register():void{

  console.log(this.registrationModel);
this.bfcService.registerUser(this.registrationModel)
        .subscribe(result => {
          console.log(result);
          var parsed = result;
          if(parsed.success == true){
            console.log("registration successful");
            this.regSuccesful = true;
            this.generateOtp();
          }else{
            alert("this Mobile Number is already registered, try reset the password");
          }
        });
}

generateOtp():void{
  var reqBody = {
    "mobileNumber":this.registrationModel.mobileNumber
  };
  this.bfcService.generateOtp(reqBody)
  .subscribe(result=>{
    var parsed=result;
    if(result.success == true){
      //alert("Please enter the OTP sent to your mobile number");
      this.activationModel.mobileNumber = this.registrationModel.mobileNumber;
    }else{
      alert("Something went wrong with your mobile number");
    }
  });

}

login():void{

  var queryString  = "regUser?mobileNumber="+this.loginModel.mobileNumber+"&password="+this.loginModel.password;
  console.log(queryString);
  this.bfcService.makeCommonGetRequest(queryString)
          .subscribe(result => {
          //  console.log(result);
            var parsed = result;
            if(result.length > 0){
          this.loginUser = result[0];
          if(this.rememberMe == true){

          }
          document.getElementById('modalClose').click();
          this.userLoggedIn = true;
          this.loginUserData.emit(this.loginUser);
          this.loginModel.mobileNumber = "";
          this.loginModel.password = "";
        }else{
          alert('Invalid user name or password');
        }
          });
}

remeberMe(event):void{
if(event.target.checked == true){
    this.rememberMe = true;  //  localStorage.setItem("shouldRemember","true");
}else{
    this.rememberMe = false;
}

}

}
