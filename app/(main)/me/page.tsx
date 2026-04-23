import { LogoutButton } from "./logout-button";

export default function MePage() {
  return (
    <div className="flex flex-col h-full">
      <header className="px-4 py-4 border-b border-gray-200 bg-white">
        <h1 className="text-lg font-bold">내 정보</h1>
      </header>
      <div className="flex-1 p-4 flex flex-col gap-4">
        <LogoutButton />
      </div>
    </div>
  );
}
