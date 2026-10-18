import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useGlobals } from "../../hooks/useGlobals";

const socialLinks = [
  { label: "Instagram", icon: InstagramIcon, href: "" },
  { label: "Facebook", icon: FacebookIcon, href: "" },
  { label: "X / Twitter", icon: TwitterIcon, href: "" },
];

const contactDetails = {
  location: "Location details coming soon",
  contact: "Contact details coming soon",
};

export default function Footer() {
  const { authMember } = useGlobals();

  return (
    <footer className="site-footer">
      <Container className="site-footer-container">
        <div className="site-footer-grid">
          <Box className="site-footer-brand">
            <img src="/icons/espresso.png" alt="Espresso Yourself" />
            <p>Discover coffee, refreshing drinks, and your next favorite cup.</p>
          </Box>
          <Stack className="site-footer-column">
            <span>Menu</span>
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            {authMember && <Link to="/orders">Orders</Link>}
          </Stack>
          <Stack className="site-footer-column">
            <span>Support</span>
            <Link to="/help">Help Center</Link>
            <Link to="/help">FAQ</Link>
            {authMember && <Link to="/member-page">My Page</Link>}
          </Stack>
          <Stack className="site-footer-column site-footer-connect">
            <span>Follow us</span>
            <div className="site-footer-socials">
              {socialLinks.map(({ label, icon: Icon, href }) => href ? <a key={label} href={href} aria-label={label} target="_blank" rel="noopener noreferrer"><Icon size={19} /></a> : <span key={label} aria-label={`${label} link coming soon`}><Icon size={19} /></span>)}
            </div>
            <div className="site-footer-contact"><MapPin size={17} /><p><strong>Contact & location</strong>{contactDetails.location}<br />{contactDetails.contact}</p></div>
          </Stack>
        </div>
        <Box className="site-footer-bottom">© {new Date().getFullYear()} Espresso Yourself. All rights reserved.</Box>
      </Container>
    </footer>
  );
}
