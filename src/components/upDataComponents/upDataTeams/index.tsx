import React from "react";
import style from "./UpDataTeams.module.scss";
import TeamsContainer from "../../teamsContainer";
import { ModeTeamContainer } from "../../../common/@types/teammate";

const UpDataTeams = () => {
  return (
    <div className={style.root}>
      <TeamsContainer mode={ModeTeamContainer.UPDATE} />
    </div>
  );
};

export default UpDataTeams;
