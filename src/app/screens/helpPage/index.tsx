import React from "react";
import { Box, Container, Stack, Tabs } from "@mui/material";
import Typography from "@mui/material/Typography";
import Tab from "@mui/material/Tab";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import "../../../css/help.css";
import { faq } from "../../../lib/data/faq";
import { terms } from "../../../lib/data/terms";

export default function HelpPage() {
  const [value, setValue] = React.useState("2");

  /** HANDLERS **/
  
  const handleChange = (e: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className={"help-page"}>
      <Container className={"help-container"}>
        <header className="help-header">
          <span>HELP CENTER</span>
          <h1>How can we help?</h1>
          <p>Find answers, review our terms, or get in touch.</p>
        </header>
        <TabContext value={value}>
          <Box className={"help-menu"}>
            <Tabs value={value} onChange={handleChange} aria-label="Help center sections" className={"table_list"} variant="scrollable" scrollButtons={false}>
              <Tab label="FAQ" value={"2"} />
              <Tab label="Terms" value={"1"} />
              <Tab label="Contact" value={"3"} />
            </Tabs>
          </Box>
          <Stack className={"help-main-content"}>
              <TabPanel value={"1"}>
                <section className={"rules-box"}>
                  <span className="help-content-eyebrow">TERMS</span>
                  <h2>Terms &amp; conditions</h2>
                  <Box className={"rules-frame"}>{terms.map((term, number) => <p key={number}>{term}</p>)}</Box>
                </section>
              </TabPanel>
              <TabPanel value={"2"}>
                <section className={"accordion-menu"}>
                  <span className="help-content-eyebrow">FAQ</span>
                  <h2>Frequently asked questions</h2>
                  {faq.map((value, number) => {
                    return (
                      <Accordion key={number}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls={`faq-panel-${number}-content`}
                          id={`faq-panel-${number}-header`}
                        >
                          <Typography>{value.question}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>{value.answer}</Typography>
                        </AccordionDetails>
                      </Accordion>
                    );
                  })}
                </section>
              </TabPanel>
              <TabPanel value={"3"}>
                <section className={"admin-letter-box"}>
                  <div className={"admin-letter-container"}>
                    <Box className={"admin-letter-frame"}>
                      <span>Get in touch</span>
                      <p>Have a question that isn&apos;t answered above? Send us a message.</p>
                    </Box>
                    <form
                      action={"#"}
                      method={"POST"}
                      className={"admin-letter-frame"}
                    >
                      <div className={"admin-input-box"}>
                        <label htmlFor="help-name">Your name</label>
                        <input
                          id="help-name"
                          type={"text"}
                          name={"memberNick"}
                          placeholder={"Type your name here"}
                        />
                      </div>
                      <div className={"admin-input-box"}>
                        <label htmlFor="help-email">Your email</label>
                        <input
                          id="help-email"
                          type={"text"}
                          name={"memberEmail"}
                          placeholder={"Type your email here"}
                        />
                      </div>
                      <div className={"admin-input-box"}>
                        <label htmlFor="help-message">Message</label>
                        <textarea
                          id="help-message"
                          name={"memberMsg"}
                          placeholder={"Your message"}
                        ></textarea>
                      </div>
                      <Box
                        display={"flex"}
                        justifyContent={"flex-end"}
                        sx={{ mt: "30px" }}
                      >
                        <Button type={"submit"} variant="contained">
                          Send message
                        </Button>
                      </Box>
                    </form>
                  </div>
                </section>
              </TabPanel>
          </Stack>
        </TabContext>
      </Container>
    </div>
  );
}
