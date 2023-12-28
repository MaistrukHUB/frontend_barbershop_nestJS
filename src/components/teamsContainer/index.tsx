import React, { useState } from "react";
import style from "./TeamsContainer.module.scss";
import {
  ITeamsContainerProps,
  ModeTeamContainer,
  Teammate,
} from "../../common/@types/teammate";
import TeammateCard from "../teammateCard";
import { useAdmin, useAppSelector } from "../../utils/hook";
import CreateNewTeammate from "../createNewTeammate";

const TeamsContainer: React.FC<ITeamsContainerProps> = ({ mode }) => {
  const { team } = useAppSelector((state) => state.teammateSlice);

  return (
    <ul className={`${style.root} `}>
      {mode === ModeTeamContainer.UPDATE ? <CreateNewTeammate /> : ""}
      {team &&
        team.map((teammate: Teammate) => (
          <li>
            <TeammateCard mode={mode} teammate={teammate} />
          </li>
        ))}
    </ul>
  );
};

export default TeamsContainer;
