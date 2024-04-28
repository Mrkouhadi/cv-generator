import { useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import Barcode from "../assets/images/barcode.jpeg";
import { SendPdfFile } from "../../wailsjs/go/main/App";

const Setting = () => {
  const pdfRef = useRef(null);

  const createPDF = async () => {
    try {
      if (!pdfRef.current) {
        console.error("pdfRef is null");
        return;
      }

      const data = await html2canvas(pdfRef.current, { scale: 2 });
      const imgData = data.toDataURL("image/jpeg", 1.0);

      const pdf = new jsPDF();
      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);

      // Get the bytes of the PDF
      const pdfBytes = pdf.output();

      // Convert PDF bytes to base64 string
      const pdfBase64 = btoa(pdfBytes);
      await SendPdfFile(JSON.stringify({ pdfData: pdfBase64 }), "anotherpdf");
    } catch (error) {
      console.error("Error creating PDF:", error);
    }
  };

  return (
    <div className="text-dark dark:text-white h-screen bg-brown-400 p-4">
      <div
        id="pdf"
        ref={pdfRef}
        className="m-8 p-4 bg-green-800 h-[80%] flex flex-col items-center"
      >
        <p>TO: John Citizen</p>
        <p>123 Random Street</p>
        <p>Oak Creek, Colorado (CO), 80467</p>
        <img className="w-44 h-44" src={Barcode} alt="Barcode" />
        <div className="h-[60vh] bg-white my-2 w-full"></div>
      </div>
      <button
        onClick={createPDF}
        type="button"
        className="p-4 bg-primary text-white"
      >
        Save PDF on Server
      </button>
    </div>
  );
};

export default Setting;
