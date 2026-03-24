import dynamic from "next/dynamic";

const InputSummaryDashboard = dynamic(
  () => import("../components/InputSummaryDashboard"),
  { ssr: false }
);

export default function Dashboard() {
  return <InputSummaryDashboard />;
}
