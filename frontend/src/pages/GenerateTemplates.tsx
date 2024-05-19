import { useTranslation } from "react-i18next";
import Canadian1 from "../components/templates/Canadian1";
import { useLocation, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { SendPdfFile, SendPngFile } from "../../wailsjs/go/main/App";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Canadian2 from "../components/templates/Canadian2";

const GenerateTemplates: React.FC = () => {
  const [tmpl, setTmpl] = useState<string>("canadian1");
  const navigate = useNavigate();
  const location = useLocation();
  const { user, educations, experiences, skills, languages } = location.state;
  const { t } = useTranslation("global");
  if (user == undefined) return <h1>loading...</h1>;
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
      //  send imageData to your backend or save it locally
      await SendPngFile(JSON.stringify({ imageData }));
    } catch (error) {
      console.error("Error creating PNG:", error);
    }
  };
  return (
    <div className="relative min-h-screen p-4">
      {/* go back button */}
      <button
        className="absolute left-2 top-2  p-2"
        onClick={() => navigate(-1)}
      >
        <ArrowLeftIcon className="w-6 h-6 text-black dark:text-white " />
      </button>

      <div className="flex flex-col gap-4 pt-10 min-h-screen">
        {/* available templates*/}
        <section className="overflow-x-auto whitespace-nowrap">
          <div
            onClick={() => setTmpl("canadian1")}
            className="inline-block bg-red-500 h-52 w-44 mr-4 shadow"
          ></div>
          <div
            onClick={() => setTmpl("canadian2")}
            className="inline-block bg-red-500 h-52 w-44 mr-4 shadow"
          ></div>
          <div
            onClick={() => setTmpl("canadian2")}
            className="inline-block bg-red-500 h-52 w-44 mr-4 shadow"
          ></div>
          <div
            onClick={() => setTmpl("canadian2")}
            className="inline-block bg-red-500 h-52 w-44 mr-4 shadow"
          ></div>
          <div
            onClick={() => setTmpl("canadian2")}
            className="inline-block bg-red-500 h-52 w-44 mr-4 shadow"
          ></div>
          <div
            onClick={() => setTmpl("canadian2")}
            className="inline-block bg-red-500 h-52 w-44 mr-4 shadow"
          ></div>
        </section>
        {/* The generated template */}
        <div
          id="pdf"
          ref={pdfRef}
          className=" flex flex-col items-center w-full"
        >
          {(() => {
            switch (tmpl) {
              case "canadian1":
                return (
                  <Canadian1
                    data={{ user, educations, experiences, skills, languages }}
                  />
                );
              case "canadian2":
                return (
                  <Canadian2
                    data={{ user, educations, experiences, skills, languages }}
                  />
                );
              default:
                return <div className="">""</div>;
            }
          })()}
        </div>
      </div>
      {/* exporting buttons */}
      <div className="flex items-center justify-between px-2">
        <button
          onClick={createPDF}
          type="button"
          className="p-4 bg-primary text-white mt-4"
        >
          {t("button.exportPDF")}
        </button>
        <button
          onClick={createPNG}
          type="button"
          className="p-4 bg-primary text-white mt-4"
        >
          {t("button.exportPNG")}
        </button>
      </div>
    </div>
  );
};
export default GenerateTemplates;
