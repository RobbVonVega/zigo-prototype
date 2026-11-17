import { Icon } from "@/components/icon";
import { promoBanner } from "@/lib/upcoming-flights";

/**
 * "Vuela a Bogotá" promo card (Figma node 6706-1429).
 * 1030×164 at 1440: #FFF9F5 surface, 1px #ECECEC border, 10px radius, 12px
 * padding, 350px copy column and three flexible photos.
 *
 * The text uses Figma's glyph boxes (leading 23/11) so the column stays at the
 * design's 140px and the card at 164px.
 */
export function PromoBanner() {
  return (
    <section
      aria-labelledby="promo-title"
      className="flex flex-col gap-3 rounded-card bg-promo p-3 ring-1 ring-line ring-inset xl:flex-row"
    >
      <div className="flex w-full flex-col justify-between gap-4 xl:w-[350px] xl:shrink-0">
        <div className="flex flex-col gap-4">
          <span className="flex h-6 w-fit items-center gap-1 rounded-pill bg-brand-soft px-2">
            <span className="size-1.5 rounded-full bg-brand" />
            <span className="text-2xs leading-[13px] font-semibold text-ink">
              {promoBanner.badge}
            </span>
          </span>

          <div className="flex flex-col gap-3">
            <p className="flex items-center gap-1">
              <span className="text-body-lg leading-[18px] font-medium text-muted">
                {promoBanner.pricePrefix}
              </span>
              <span className="text-[32px] leading-[23px] font-semibold tracking-[-0.04em] text-ink">
                {promoBanner.price}
              </span>
              <Icon name="info" className="size-[14px] text-muted" />
            </p>

            <p
              id="promo-title"
              className="text-body-lg leading-[11px] font-semibold text-ink"
            >
              {promoBanner.title}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="h-[38px] rounded-control bg-brand px-6 text-body font-semibold text-white transition-colors hover:bg-brand-hover"
          >
            {promoBanner.cta}
          </button>

          <p className="text-xs leading-[14.4px] font-medium text-muted">
            {promoBanner.caption}
          </p>
        </div>
      </div>

      <div className="flex min-w-0 flex-1 gap-3">
        {promoBanner.images.map((image) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={image.src}
            src={image.src}
            alt={image.alt}
            width={414}
            height={280}
            className="h-[140px] min-w-0 flex-1 rounded-[5px] object-cover"
          />
        ))}
      </div>
    </section>
  );
}
