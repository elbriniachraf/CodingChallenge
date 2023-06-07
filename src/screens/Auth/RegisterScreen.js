import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";



import axios from "axios";
import { Button } from "react-native-paper";
import Btn from "../../components/Btn";

import { useNavigation } from "@react-navigation/native";

const Field = (props) => {
    return (
        <View style={{ width: !props.isHalfScreen ? "100%" : "49%" }}>
            <TextInput
                {...props}
                style={{
                    // flex: props.isHalfScreen?1:0,
                    borderRadius: 10,
                    color: colors.grayedBlue,
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    borderWidth: 1,
                    borderColor: colors.green2,
                }}
            ></TextInput>
            <Text style={{
                fontSize: 12,
                color: colors.tomato,
                marginStart: 5,
                marginHorizontal: 4,
                marginBottom: 10
            }}>{props.errorText}</Text>
        </View>
    );
};

const RegisterScreen = ({  }) => {
  // form values :
  const navigation=useNavigation();

  const [name, setname] = useState(initialState);

  const [email, setEmail] = useState("");
 
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validated, setValidated] = useState(false);

  // inputs error states :
  const [nameError, setnameError] = useState(initialState);
  const [emailError, setEmailError] = useState("");
 
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  // vlidate the form :
  const validateForm = () => {
    let isValid = true;
    const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    const nameV = name;
    
    const emailV = email;

    const passwordV = password;
    const confirmPasswordV = confirmPassword;

    // validate name
    if (!nameV.match(nameRegex)) {
      setnameError("Invalid first name");
      isValid = false;
    }


    
   

    // validate email
    if (!emailV.match(emailRegex)) {
      setEmailError("Invalid email");
      isValid = false;
    }

    // validate password
    if (!passwordV.match(passwordRegex)) {
      setPasswordError("Invalid password");
      isValid = false;
    }

    // validate confirm password
    if (confirmPasswordV !== password) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    }
    isValid ? setValidated(true) : alert("champs incorrect");
  };

  // save data to database
  const RegisterScreen = () => {
    axios
      .post(
          API_URL +"/register",
        {
          name: name,
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        
      })
      .catch((error) => {
        console.log(error);
      });
  };
  

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <View style={{ alignItems: "center", width: "100%", marginTop: 20 }}>
          <Text
            style={{
              marginTop: 20,
              color: "black",
              fontSize: 26,
              fontWeight: "bold",
            }}
          >
            Create account
          </Text>
          <Text
            style={{
              marginTop: 5,
              color: "#848482",
              fontSize: 16,
              marginBottom: 30,
            }}
          >
            Book your room online
          </Text>
          <View
            style={{
              width: "85%",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "space-between",
              }}
            >
              <Field
                onChangeText={(value) => [
                  setname(value),
                  setValidated(false),
                  setnameError(""),
                ]}
                placeholder="Name"
                isHalfScreen={true}
                errorText={nameError}
              />
            </View>
            <Field
              onChangeText={(value) => [
                setEmail(value),
                setValidated(false),
                setEmailError(""),
              ]}
              placeholder="Email"
              keyboardType={"email-address"}
              errorText={emailError}
            />
           
            <Field
              onChangeText={(value) => [setPassword(value),setValidated(false),setPasswordError("")]}
              placeholder="Password"
              secureTextEntry={true}
              errorText={passwordError}
            />
            <Field
              onChangeText={(value) => [setConfirmPassword(value),setValidated(false),setConfirmPasswordError("")]}
              placeholder="Confirm Password"
              secureTextEntry={true}
              errorText={confirmPasswordError}
            />

            <Btn
              Press={validated ? signupUser : validateForm}
              textColor="white"
                          bgColor="#00507D"
              btnLabel="Signup"
              btnWidth={"100%"}
            />
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 15,
              }}
            >
              <Text style={{ fontSize: 16 }}>Already have an account ? </Text>
              <TouchableOpacity
                              onPress={() => navigation.navigate("Login")}
              >
                <Text
                  style={{
                                      color: "#00507D",
                    fontWeight: "bold",
                    fontSize: 16,
                    marginLeft: 3,
                  }}
                >
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
