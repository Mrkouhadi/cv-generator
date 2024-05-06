import { useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { SendPdfFile, SendPngFile } from "../../wailsjs/go/main/App";
import Canadian1 from "../components/templates/Canadian1";

const Setting: React.FC = () => {
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

  const createPNG = async () => {
    try {
      if (!pdfRef.current) {
        console.error("componentRef is null");
        return;
      }

      // Capture the component as an image using html2canvas
      const canvas = await html2canvas(pdfRef.current, {
        scale: 2, // Adjust scale if needed
      });

      // Convert the canvas to a data URL representing a PNG image
      const imageData = canvas.toDataURL("image/png");

      // You can now send imageData to your backend or save it locally
      console.log("PNG image data:", imageData);
      await SendPngFile(JSON.stringify({ imageData }));
    } catch (error) {
      console.error("Error creating PNG:", error);
    }
  };
  return (
    <div className="min-h-screen p-4">
      <div id="pdf" ref={pdfRef} className=" flex flex-col items-center">
        {/* a template to be converted to a pdf */}
        <Canadian1 />
      </div>
      <div className="flex items-center justify-between px-5">
        <button
          onClick={createPDF}
          type="button"
          className="p-4 bg-primary text-white mt-4"
        >
          EXPORT as PDF
        </button>
        <button
          onClick={createPNG}
          type="button"
          className="p-4 bg-primary text-white mt-4"
        >
          EXPORT as PNG
        </button>
      </div>
    </div>
  );
};
export default Setting;
