import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

export default function Btn({ bgColor, btnLabel, textColor, Press ,btnWidth,style,didDisabled}) {
  return (
    <TouchableOpacity
      disabled={didDisabled}
      activeOpacity={0.8}
      onPress={Press}
      style={[{
        backgroundColor: bgColor,
        opacity:didDisabled?.7:1,
        borderRadius: 10,
        alignItems: "center",
        paddingVertical: 5,
        marginVertical: 10,
        width : btnWidth,
      },style]}
    >
      <Text style={{ color: textColor, fontSize: 24, fontWeight: "bold" }}>
        {btnLabel}
      </Text>
    </TouchableOpacity>
  );
}
