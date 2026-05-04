import { type AnyFieldApi } from '@tanstack/react-form';

export function FieldInfo({ field }: { field: AnyFieldApi }) {
  // If field is untouched, or valid, or error array is empty — show nothing
  if (
    !field.state.meta.isTouched ||
    field.state.meta.isValid ||
    !field.state.meta.errors.length
  ) {
    return null;
  }

  // Take ONLY THE FIRST error from the array
  const firstError = field.state.meta.errors[0];
  let errorMessage: string;

  if (firstError && typeof firstError === 'object' && 'message' in firstError) {
    errorMessage = String(firstError.message);
  } else {
    errorMessage = String(firstError);
  }

  return (
    <p className="text-xs font-medium text-destructive mt-1.5">
      {errorMessage}
    </p>
  );
}
