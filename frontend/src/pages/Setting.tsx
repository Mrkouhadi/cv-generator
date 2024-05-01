import { useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { SendPdfFile } from "../../wailsjs/go/main/App";
import Canadian1 from "../components/templates/Canadian1";

const Setting = () => {
  const pdfRef = useRef(null);

  const createPDF = async () => {
    try {
      if (!pdfRef.current) {
        console.error("pdfRef is null");
        return;
      }
      // https://html2canvas.hertzen.com/configuration
      const data = await html2canvas(pdfRef.current, {
        scale: 2,
        // width: 791,
        // height: 1120,
      });
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
      <div id="pdf" ref={pdfRef} className=" flex flex-col items-center">
        {/* a template to be converted to a pdf */}
        <Canadian1 />
      </div>

      <button
        onClick={createPDF}
        type="button"
        className="p-4 bg-primary text-white mt-4"
      >
        DOWNLOAD MY CV
      </button>
    </div>
  );
};
export default Setting;
