import { importantInfo } from "@/lib/important-info";

/**
 * "Información importante" (Figma 6759-7498): one card per policy block, with
 * optional FAQ items and a closing paragraph.
 */
export function ImportantInfoSection() {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-[24px] leading-[17px] font-semibold tracking-[-0.04em] text-ink">
        Información importante
      </h2>

      <div className="flex flex-col gap-2">
        {importantInfo.map((block) => (
          <article
            key={block.title}
            className="flex flex-col gap-4 rounded-[8px] border border-line bg-white px-4 pt-4 pb-6"
          >
            <h3 className="text-body-lg leading-[11px] font-semibold tracking-[-0.04em] text-ink">
              {block.title}
            </h3>

            {block.body ? (
              <p className="text-xs leading-[14.4px] font-medium tracking-[-0.04em] text-ink">
                {block.body}
              </p>
            ) : null}

            {block.faqs?.map((faq) => (
              <div key={faq.question} className="flex flex-col gap-2">
                <p className="text-xs leading-[14.4px] font-semibold tracking-[-0.04em] text-ink">
                  {faq.question}
                </p>
                <p className="text-xs leading-[14.4px] font-medium tracking-[-0.04em] text-ink">
                  {faq.answer}
                </p>
              </div>
            ))}

            {block.footer ? (
              <p className="text-xs leading-[14.4px] font-medium tracking-[-0.04em] text-ink">
                {block.footer}
              </p>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
