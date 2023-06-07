import React from "react";
import { TextInput, View,Text } from "react-native";
import { colors } from "../components/styles";

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
      <Text style= {{
        fontSize:12,
        color:colors.tomato,
        marginStart:5,
        marginHorizontal:4,
        marginBottom: 10
      }}>{props.errorText}</Text>
    </View>
  );
};

export default Field;
