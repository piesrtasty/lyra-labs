import React, { useState, useContext } from "react";
import styled from "@emotion/native";
import { Heading, RegularText, MediumText } from "@components/shared";

export const Divider = styled.View`
  border-bottom-width: 1px;
  border-color: rgba(255, 255, 255, 0.05);
  width: 100%;
  margin-top: 30px;
  margin-bottom: 30px;
`;

export const Container = styled.View`
  display: flex;
  flex-direction: column;
`;

export const TopRow = styled.View`
  flex-direction: row;
`;

export const BottomRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const LeftCol = styled.View`
  flex-grow: 1;
  flex: 1;
`;

export const RightCol = styled.View`
  justify-content: center;
  margin-left: 15px;
`;

export const SourceMeta = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const SourceLogo = styled.Image`
  height: 25px;
  width: 25px;
  background-color: white;
  margin-right: 8px;
`;

export const Title = styled(Heading)`
  font-size: 15px;
  margin-top: 10px;
  margin-bottom: 10px;
  flex-wrap: wrap;
`;

export const SourceName = styled(MediumText)`
  font-size: 13px;
  color: ${(props) => props.theme.colors.secondary};
`;

export const Meta = styled.View``;

export const MetaDate = styled(RegularText)``;

export const Thumbnail = styled.Image`
  width: 90px;
  height: 60px;
`;

export const Actions = styled.View`
  flex-direction: row;
`;

export const Action = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ActionName = styled(MediumText)``;

export const PressableAction = styled.Pressable``;
