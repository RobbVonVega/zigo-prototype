"use client";

import { useEffect, useState } from "react";

import { Icon } from "@/components/icon";
import { SelectMenu } from "@/components/ui/select-menu";
import { TextField } from "@/components/ui/text-field";
import { cn } from "@/lib/cn";
import {
  PASSENGER_TYPE_LABEL,
  companies,
  departments,
  emptyPassengerInfo,
  genders,
  identificationOrigins,
  identificationTypes,
  nationalities,
  type PassengerInfo,
  type PassengerRecord,
} from "@/lib/passengers";

const NEW_PERSON = "__new";

/**
 * "Información de Pasajero" modal (Figma 6770-7206).
 *
 * Company → person search prefills the corporate/personal blocks; "+ Nueva
 * persona" starts from scratch. Both blocks stay disabled until a company (and
 * person or new person) is chosen. Comments are always available.
 */
export function PassengerOverlay({
  index,
  passenger,
  onClose,
  onSave,
}: {
  index: number;
  passenger: PassengerRecord;
  onClose: () => void;
  onSave: (info: PassengerInfo) => void;
}) {
  const [draft, setDraft] = useState<PassengerInfo>(
    passenger.info ?? emptyPassengerInfo(passenger.type),
  );
  const [isNewPerson, setIsNewPerson] = useState(
    passenger.info ? passenger.info.personId === null : false,
  );

  const company = companies.find((item) => item.id === draft.companyId) ?? null;
  const canEdit = Boolean(company) && (draft.personId !== null || isNewPerson);
  const canSave =
    canEdit && draft.firstName.trim() !== "" && draft.lastName.trim() !== "";

  const personOptions = company
    ? [
        { id: NEW_PERSON, label: "+ Nueva persona", accent: true },
        ...company.people.map((person) => ({
          id: person.id,
          label: `${person.firstName} ${person.lastName}`,
        })),
      ]
    : [];

  function set<K extends keyof PassengerInfo>(field: K, value: PassengerInfo[K]) {
    setDraft((current) => ({ ...current, [field]: value }));
  }

  function chooseCompany(companyId: string) {
    const selected = companies.find((item) => item.id === companyId);
    setDraft((current) => ({
      ...emptyPassengerInfo(passenger.type),
      companyId,
      companyName: selected?.name ?? "",
      comments: current.comments,
    }));
    setIsNewPerson(false);
  }

  function choosePerson(personId: string) {
    if (personId === NEW_PERSON) {
      setIsNewPerson(true);
      setDraft((current) => ({
        ...emptyPassengerInfo(passenger.type),
        companyId: current.companyId,
        companyName: current.companyName,
        comments: current.comments,
      }));
      return;
    }

    const person = company?.people.find((item) => item.id === personId);
    setIsNewPerson(false);
    if (!person) return;

    setDraft((current) => ({
      ...current,
      personId: person.id,
      firstName: person.firstName,
      lastName: person.lastName,
      department: person.department,
      costCenter: person.costCenter,
      account: person.account,
      nationality: person.nationality,
      idType: person.idType,
      idOrigin: person.idOrigin,
      identification: person.identification,
      gender: person.gender,
      birthDate: person.birthDate,
      phone: person.phone,
      email: person.email,
    }));
  }

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-black/60 p-6 [animation:loader-fade_0.2s_ease-out]"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Información de Pasajero"
        onClick={(event) => event.stopPropagation()}
        className="my-auto flex max-h-[92vh] w-[629px] max-w-full animate-overlay-pop flex-col gap-5 overflow-y-auto rounded-[8px] border border-ink/10 bg-white px-3 py-6"
      >
        <div className="flex items-center justify-between gap-5">
          <h2 className="text-[24px] leading-[18px] font-semibold tracking-[-0.04em] text-ink">
            Información de Pasajero
          </h2>

          <button
            type="button"
            aria-label="Cerrar"
            onClick={onClose}
            className="grid size-[18px] shrink-0 place-items-center text-ink/30 transition-colors hover:text-ink/60"
          >
            <Icon name="close" className="size-[9px]" />
          </button>
        </div>

        <div className="h-px w-full bg-line" />

        <div className="flex gap-3">
          <SelectMenu
            label="Empresa"
            value={draft.companyId}
            placeholder="Seleccione"
            options={companies.map((item) => ({
              id: item.id,
              label: item.name,
            }))}
            onChange={chooseCompany}
            className="flex-1"
          />

          <SelectMenu
            label="Persona"
            value={isNewPerson ? NEW_PERSON : (draft.personId ?? "")}
            placeholder={company ? "Seleccione" : "Selecciona una empresa"}
            options={personOptions}
            onChange={choosePerson}
            disabled={!company}
            className="flex-1"
          />
        </div>

        <fieldset
          disabled={!canEdit}
          className={cn(
            "m-0 flex min-w-0 flex-col gap-5 border-0 p-0",
            !canEdit && "opacity-60",
          )}
        >
          <div className="h-px w-full bg-line" />

          <h3 className="text-body-lg leading-[11px] font-semibold tracking-[-0.04em] text-ink">
            Información Corporativa
          </h3>

          <SelectMenu
            label="Departamento"
            value={draft.department}
            options={departments.map((item) => ({ id: item, label: item }))}
            onChange={(value) => set("department", value)}
          />

          <div className="flex gap-3">
            <TextField
              label="Centro de costos"
              value={draft.costCenter}
              onChange={(value) => set("costCenter", value)}
              className="flex-1"
            />
            <TextField
              label="Cuenta"
              value={draft.account}
              onChange={(value) => set("account", value)}
              className="flex-1"
            />
          </div>

          <div className="h-px w-full bg-line" />

          <h3 className="text-body-lg leading-[11px] font-semibold tracking-[-0.04em] text-ink">
            Información Personal
          </h3>

          <div className="flex gap-3">
            <SelectMenu
              label="Nacionalidad"
              value={draft.nationality}
              options={nationalities.map((item) => ({ id: item, label: item }))}
              onChange={(value) => set("nationality", value)}
              className="flex-1"
            />
            <SelectMenu
              label="Tipo de Identificación"
              value={draft.idType}
              options={identificationTypes.map((item) => ({
                id: item,
                label: item,
              }))}
              onChange={(value) => set("idType", value)}
              className="flex-1"
            />
          </div>

          <div className="flex gap-3">
            <SelectMenu
              label="Origen de identificación"
              value={draft.idOrigin}
              options={identificationOrigins.map((item) => ({
                id: item,
                label: item,
              }))}
              onChange={(value) => set("idOrigin", value)}
              className="flex-1"
            />
            <TextField
              label="Identificación"
              value={draft.identification}
              onChange={(value) => set("identification", value)}
              className="flex-1"
            />
          </div>

          <div className="flex gap-3">
            <SelectMenu
              label="Género"
              value={draft.gender}
              options={genders.map((item) => ({ id: item, label: item }))}
              onChange={(value) => set("gender", value)}
              className="flex-1"
            />
            <TextField
              label="Fecha de nacimiento"
              type="date"
              value={draft.birthDate}
              onChange={(value) => set("birthDate", value)}
              className="flex-1"
            />
          </div>

          <div className="flex gap-3">
            <TextField
              label="Nombres"
              value={draft.firstName}
              onChange={(value) => set("firstName", value)}
              className="flex-1"
            />
            <TextField
              label="Apellidos"
              value={draft.lastName}
              onChange={(value) => set("lastName", value)}
              className="flex-1"
            />
          </div>

          <div className="flex gap-3">
            <TextField
              label="Número de teléfono"
              type="tel"
              value={draft.phone}
              onChange={(value) => set("phone", value)}
              className="flex-1"
            />
            <TextField
              label="Correo electrónico"
              type="email"
              value={draft.email}
              onChange={(value) => set("email", value)}
              className="flex-1"
            />
          </div>
        </fieldset>

        <div className="h-px w-full bg-line" />

        <div className="flex flex-col gap-[6px]">
          <span className="text-xs leading-[9px] font-semibold tracking-[-0.04em] text-ink">
            Comentarios adicionales
          </span>

          <textarea
            value={draft.comments}
            onChange={(event) => set("comments", event.target.value)}
            placeholder="Comentarios para Zigo (opcional)"
            className="h-[60px] w-full resize-none rounded-control border border-line bg-surface px-3 py-3 text-xs leading-[14.4px] font-medium text-ink outline-none transition-colors placeholder:text-muted focus:border-ink/40"
          />
        </div>

        {/* The design's footer scrolls out of the frame; keep it reachable. */}
        <div className="sticky bottom-0 -mx-3 -mb-6 flex justify-end border-t border-line bg-white px-3 py-3">
          <button
            type="button"
            disabled={!canSave}
            onClick={() => onSave(draft)}
            className="h-[30px] rounded-[4px] bg-brand px-5 text-xs font-semibold tracking-[-0.04em] text-white transition-colors hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-40"
          >
            Agregar
          </button>
        </div>

        <p className="sr-only">
          Pasajero {index + 1}: {PASSENGER_TYPE_LABEL[passenger.type]}
        </p>
      </div>
    </div>
  );
}
