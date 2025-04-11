import "./staticReportComp.scss"
import { StaticReport } from "@/shared/types/db-models";


export function StaticReportComp({ id, title, subtitle, image, paragraph }: StaticReport) {
  return (
    <div key={id} className="static-report">
      <div className="static-report-titles">
        <p className="report-title"> {title} </p>
        <p className="report-sub-title"> {subtitle} </p>
      </div>

      <div className="imageContainer">
        <img src={image} alt=" " className="staticReportImage" />
      </div>

      <p className="report-paragraph"> {paragraph} </p>
    </div>
  );
}
