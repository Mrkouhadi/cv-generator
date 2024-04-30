import { useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import Barcode from "../assets/images/barcode.jpeg";
import { SendPdfFile } from "../../wailsjs/go/main/App";
import PersonDetails from "../components/forms/PersonDetails";

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
      await SendPdfFile(JSON.stringify({ pdfData: pdfBase64 }), "newpdf");
    } catch (error) {
      console.error("Error creating PDF:", error);
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div
        id="pdf"
        ref={pdfRef}
        className="m-8 p-4 h-[80%] flex flex-col items-center"
      >
        <PersonDetails />
      </div>

      <button
        onClick={createPDF}
        type="button"
        className="p-4 bg-primary text-white"
      >
        DOWNLOAD MY CV
      </button>
    </div>
  );
};
export default Setting;
