import { Button, Container } from "@mui/material";
import { Settings } from "./Settings";
import { useHistory } from "react-router-dom";
import { useGlobals } from "../../hooks/useGlobals";
import "../../../css/userPage.css";

export default function UserPage() {
  const history = useHistory();
  const { authMember } = useGlobals();
  if (!authMember) history.push("/");
  return (
    <div className={"user-page"}>
      <Container className="my-account-container">
        <header className="my-account-header">
          <span>MY ACCOUNT</span>
          <h1>Welcome back, {authMember?.memberNick}</h1>
          <p>Manage your profile and account information.</p>
        </header>
        <section className="my-account-layout">
          <aside className="account-summary-card">
            <img src={authMember?.memberImage ? authMember.memberImage : "/icons/default-user.svg"} className="account-summary-avatar" alt={`${authMember?.memberNick}'s profile`} />
            <span className="account-summary-type">{authMember?.memberType}</span>
            <h2>{authMember?.memberNick}</h2>
            {authMember?.memberPhone && <p>{authMember.memberPhone}</p>}
            {authMember?.memberAddress && <p>{authMember.memberAddress}</p>}
            <Button className="account-orders-link" onClick={() => history.push("/orders")}>View orders</Button>
          </aside>
          <section className="account-settings-surface">
            <div className="account-settings-heading">
              <span>PROFILE</span>
              <h2>Profile information</h2>
              <p>Update the details connected to your account.</p>
            </div>
            <Settings />
          </section>
        </section>
      </Container>
    </div>
  );
}
