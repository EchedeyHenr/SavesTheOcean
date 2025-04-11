import { StaticReportComp } from "./individualStaticReport/StaticReportComp";
import s from './staticReports.module.scss'

export function StaticReports() {
  return (
    <section className={s.staticReportContainer}>
      <StaticReportComp
        id={1}
        title="Plastic Waste Crisis"
        subtitle="How microplastics are invading our oceans"
        image='staticReports/report2.jpg'
        paragraph={
          "Over 8 million tons of plastic enter the ocean annually, threatening marine life and ecosystems. " +
          "This report reveals the top sources of leakage and innovative solutions to curb the tide by 2030. " +
          "In addition, it discusses the long-term effects on marine food chains, the economic costs for coastal communities, " +
          "and highlights several ongoing international initiatives aimed at reducing plastic production and waste."
        }
      />
      <StaticReportComp
        id={2}
        title="Oil Spill Impacts"
        subtitle="Long-term damage to marine biodiversity"
        image='staticReports/staticReport2.avif'
        paragraph={
          "Oil spills destroy coastal habitats for decades. We analyze case studies from the Deepwater Horizon disaster " +
          "and present breakthrough cleanup technologies to mitigate future accidents. " +
          "The report also examines the impact on fisheries, tourism, and the health risks associated with chemical dispersants " +
          "used during clean-up operations."
        }
      />
      <StaticReportComp
        id={3}
        title="Coral Reefs at Risk"
        subtitle="From pollution to bleaching"
        image='staticReports/5fa2f8549f5e1.jpeg' // e.g., bleached coral vs. healthy coral
        paragraph={
          "50% of the world’s coral reefs have died due to pollution and warming waters. " +
          "Explore actionable strategies to protect remaining reefs through policy and community-led conservation. " +
          "This detailed study includes comparative analyses of reef recovery in different regions, " +
          "the role of marine protected areas (MPAs), and innovative restoration projects currently underway."
        }
      />
    </section>
  );
}
