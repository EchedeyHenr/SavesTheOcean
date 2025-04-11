import s from "./relatedTopic.module.scss";

export function RelatedTopicComp({text, img, href, alt} : {text: string, img: string , href: string, alt: string}) {
  return (
      <a className={s.relatedTopic} href={href}>
        <img className={s.relatedTopicImage} src={img} alt={alt} />
        <p className={s.relatedTopicText}>{text}</p>
      </a>
  );
}