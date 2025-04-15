import { useEffect, useState } from "react";
import type { Report } from "@/shared/types/db-models";
import { StaticReports } from "./staticReports/StaticReports";
import EmissionsChart from "../emissionsChart/EmissionsChart";
import styles from "./landingPage.module.scss";
import { RelatedTopics } from "./relatedTopics/RelatedTopics";
import { UserReportsContainer } from "./usersReportsContainer/UserReportsContainer";
import { useUser } from "../../hooks/useUser";
import { useAuth } from "../../context/AuthContext";
import Login from "../login/Login";
import WaterIcons from "../waterIcons/WaterIcons";

//! Ten al lado el services/ourReports.services.js
export function LandingPage() {
  const { user } = useUser();
  const { login, logout } = useAuth();

  return (
    <div className={styles.landingPage}>
      {!user ? (
        <>
          <Login />
          <StaticReports />
          <RelatedTopics />
        </>
      ) : (
        <>
          <WaterIcons />
          <StaticReports />
          <UserReportsContainer />
          <EmissionsChart />
          <RelatedTopics />
        </>
      )}
    </div>
  );
}

export default LandingPage;
