import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  Notebook,
  NotebookPen,
  Youtube as Icon,
  Download,
  Check,
  Copy,
} from "lucide-react";
import markdownToTxt from "markdown-to-txt";
import React, { useState, useRef } from "react";
import Youtube from "./youtube-video";
import MarkdownRenderer from "./Markdown";
import KeyConcepts from "./KeyConcept";
import { Button } from "@/components/ui/button";
interface TabsProps {
  url: string;
  detailedSummary: string;
  concepts: KeyConceptProps[];
  title: string;
  description: string;
}
type KeyConceptProps = {
  concept: string;
  explanation: string;
  header: string;
};
const Tabs = ({
  url,
  detailedSummary,
  concepts,
  title,
  description,
}: TabsProps) => {
  const [activeTab, setActiveTab] = useState("Home");
  const [copied, setCopied] = useState(false);
  const pdfRef = useRef();
  const onCopy = () => {
    const copiedSummary = markdownToTxt(detailedSummary);
    navigator.clipboard.writeText(copiedSummary);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };
  const handleDownloadPDF = () => {
    console.log("downloading..");
    const input = pdfRef.current;
    html2canvas(input ).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save("Devscribe.pdf");
    });
  };
  const tabs = [
    {
      title: "Home",
      icon: Icon,
      content: <Youtube URL={url} title={title} description={description} />,
    },
    { title: "Notes", icon: Notebook, content: detailedSummary },
    {
      title: "Key Concepts",
      icon: NotebookPen,
      content: concepts,
    },
  ];
  return (
    <div className="mt-8 p-2 ">
      <div className=" text-center  text-sm flex gap-[0.5px] items-center">
        {tabs.map((tab) => (
          <div
            key={tab.title}
            className={`flex font-semibold items-center cursor-pointer rounded-t-2xl h-8 p-2 border-2 border-b-0 border-gray-400 ${
              activeTab === tab.title ? "bg-gray-300 border-none  " : ""
            }`}
            onClick={() => setActiveTab(tab.title)}
          >
            <tab.icon className="h-4 w-4" />
            <span>{tab.title}</span>
          </div>
        ))}
      </div>
      <div className="max-h-screen overflow-y-auto p-3 border-t-2 border-gray-400  pb-36">
        {tabs.map(
          (tab) =>
            activeTab === tab.title && (
              <div key={tab.title}>
                {activeTab === "Home" ? (
                  <div>{tab.content as string}</div>
                ) : activeTab === "Key Concepts" ? (
                  <div className="mt-2 rounded-10  break-words">
                    <div className="flex flex-col items-end ">
                      <div className=" items-end justify-end  rounded-lg p-2 mb-2 text-right ">
                        <div className="rounded-md border-[2px] border-gray-200 items-center flex justify-center px-2 py-1 hover:bg-gray-200 cursor-pointer  w-10">
                          {" "}
                          <Download
                            className="h-7 w-6"
                            onClick={handleDownloadPDF}
                          />{" "}
                        </div>
                      </div>
                      <div ref={pdfRef}>
                        <KeyConcepts concepts={concepts} />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mt-2   break-words">
                    <div className="flex flex-col items-end ">
                      <div className=" items-end justify-end flex gap-2  rounded-lg p-2 mb-2 text-right ">
                        <Button
                          variant="link"
                          onClick={onCopy}
                          className="rounded-md border-[2px] border-gray-200 items-center flex justify-center px-2 py-1 hover:bg-gray-200 cursor-pointer  w-10"
                          disabled={copied}
                        >
                          {" "}
                          {copied ? (
                            <Check className="h-5 w-6" />
                          ) : (
                            <Copy className="h-5 w-6" />
                          )}
                        </Button>
                        <div className="rounded-md border-[2px] border-gray-200 items-center flex justify-center px-2 py-1 hover:bg-gray-200 cursor-pointer  w-10">
                          {" "}
                          <Download
                            className="h-7 w-6"
                            onClick={handleDownloadPDF}
                          />{" "}
                        </div>
                      </div>
                      <MarkdownRenderer
                        content={tab.content as string}
                        isVideoDescription={false}
                      />
                    </div>
                  </div>
                )}
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Tabs;
