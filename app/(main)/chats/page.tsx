export default function ChatsPage() {
  return (
    <div className="flex flex-col h-full">
      <header className="px-4 py-4 border-b border-gray-200 bg-white">
        <h1 className="text-lg font-bold">채팅</h1>
      </header>
      <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
        아직 채팅이 없어요
      </div>
    </div>
  );
}
