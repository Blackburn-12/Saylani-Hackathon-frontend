import React from "react";
import {
  PDFDownloadLink,
  Page,
  Text,
  View,
  Image,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import LOGO from "../../Images/logo-OpazD70S.png";
import "./pdfId.css";

const PdfDocument = ({ user }) => (
  <Document>
    <Page style={styles.body}>
      <View style={styles.container}>
        {/* Front Side */}
        <View style={styles.section}>
          <View style={styles.childSec}>
            <Image style={styles.logo} src={LOGO} />
            <Text style={styles.title}>
              SAYLANI MASS IT {"\n"} TRAINING PROGRAM
            </Text>
            <Image style={styles.image} src={user.profilePhotoUrl} />
          </View>
          <Text style={styles.text}>{user.name}</Text>
          <Text style={styles.text}>{user.coursePreference}</Text>
          <Text style={styles.text}>{user.rollNumber}</Text>
        </View>
        {/* Back Side */}
        <View style={styles.section2}>
          <Text style={styles.title}>Student Information</Text>
          <Text style={styles.textBack}>Name: {user.name}</Text>
          <Text style={styles.textBack}>Father Name: {user.fatherName}</Text>
          <Text style={styles.textBack}>CNIC: {user.cnicNumber}</Text>
          {/* <Text style={styles.textBack}>Class Timing: {classTiming}</Text> */}
          <Image style={styles.qrCode} src={user.qrCodeUrl} />
          <Text style={styles.textBack}>
            Note: This card is for SMIT's premises{"\n"}
            only. If found please return to SMIT
          </Text>
        </View>
      </View>
      <Text
        style={styles.pageNumber}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        fixed
      />
    </Page>
  </Document>
);

const PdfId = ({ user }) => {
  return (
    <div className="idCardContainer">
      <h2>ID Card</h2>
      <PDFDownloadLink
        document={<PdfDocument user={user} />}
        fileName="id_card.pdf"
        className="idCardButton"
      >
        {({ loading }) => (loading ? "Generating PDF..." : "Download ID Card")}
      </PDFDownloadLink>
    </div>
  );
};

const styles = StyleSheet.create({
  body: {
    padding: 25,
    fontFamily: "Helvetica",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  section: {
    width: "48%",
    paddingLeft: 35,
    paddingRight: 35,
    paddingBottom: 35,
    borderTop: "12px solid #8fc44a",
    borderBottom: "12px solid #8fc44a",
    borderLeft: "12px solid #f6bb3",
    borderRight: "12px solid #f6bb3",
    borderRadius: 10,
    textAlign: "center",
  },
  section2: {
    width: "48%",
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 35,
    borderTop: "12px solid #8fc44a",
    borderBottom: "12px solid #8fc44a",
    borderLeft: "12px solid #f6bb3",
    borderRight: "12px solid #f6bb3",
    borderRadius: 10,
    textAlign: "center",
  },
  childSec: {
    padding: 10,
    textAlign: "center",
  },
  title: {
    fontSize: 14,
    color: "#3b5998",
    marginBottom: 10,
  },
  logo: {
    width: 80,
    height: 80,
    margin: "auto",
    objectFit: "contain",
  },
  text: {
    fontSize: 14,
    color: "#333333",
    marginBottom: 5,
  },
  textBack: {
    fontSize: 12,
    color: "#333333",
    marginBottom: 5,
    textDecoration: "underline",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    margin: "auto",
    objectFit: "cover",
  },
  qrCode: {
    width: 100,
    height: 100,
    margin: "auto",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

export default PdfId;
