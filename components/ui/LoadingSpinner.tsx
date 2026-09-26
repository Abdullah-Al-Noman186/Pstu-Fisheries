export default function LoadingSpinner({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-16 h-16 rounded-full border-4 border-ocean-200 border-t-ocean-600 animate-spin" />
      <p className="mt-4 text-ocean-500 text-sm">{message}</p>
    </div>
  );
}