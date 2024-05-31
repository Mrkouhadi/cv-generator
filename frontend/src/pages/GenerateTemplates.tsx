import { useTranslation } from "react-i18next";
import Canadian1 from "../components/templates/Canadian1";
import { useLocation, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { SendPdfFile, SendPngFile } from "../../wailsjs/go/main/App";
import { ArrowDownIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";
import Canadian2 from "../components/templates/Canadian2";
import Canadian3 from "../components/templates/Canadian3";

const GenerateTemplates: React.FC = () => {
  const [tmpl, setTmpl] = useState<string>("canadian1");
  const [exportBtn, setExportBtn] = useState(false);
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
    <div className="relative min-h-screen p-4 ">
      <div className="flex items-center justify-between">
        {/* go back button */}
        <button className="p-2" onClick={() => navigate(-1)}>
          <ArrowLeftIcon className="w-6 h-6 text-black dark:text-white " />
        </button>
        {/* exporting buttons */}
        <div
          onClick={() => setExportBtn(!exportBtn)}
          className="bg-primary flex items-center justify-between cursor-pointer w-48 rounded"
        >
          <button className="p-4 text-font-dark-1  flex-1 border-0 border-r-2 border-black">
            EXPORT
          </button>
          <div className="p-4">
            <ArrowDownIcon className="size-6 text-white" />
          </div>
        </div>
        {exportBtn && (
          <div className="flex flex-col absolute right-4 top-20 bg-white text-black w-48 z-99 rounded overflow-hidden">
            <button
              onClick={createPDF}
              type="button"
              className="p-2 border-0 border-b-1 border-gray-500 hover:bg-primary hover:text-font-dark-1 "
            >
              {t("button.exportPDF")}
            </button>
            <hr />
            <button
              onClick={createPNG}
              type="button"
              className="p-2 hover:bg-primary hover:text-font-dark-1"
            >
              {t("button.exportPNG")}
            </button>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-4 pt-4 min-h-screen">
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
            onClick={() => setTmpl("canadian3")}
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
              case "canadian3":
                return (
                  <Canadian3
                    data={{ user, educations, experiences, skills, languages }}
                  />
                );
              default:
                return <div className="">""</div>;
            }
          })()}
        </div>
      </div>
    </div>
  );
};
export default GenerateTemplates;
