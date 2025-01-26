import { Chart } from "@/components/chart";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const mockedData = [
  {
    date: new Date("2025-01-01T00:00:00Z"),
    mass: 80,
    fat: 25.7,
    muscle: 42.2,
    water: 60.3,
  },
  {
    date: new Date("2025-01-02T00:00:00Z"),
    mass: 79,
    fat: 25.5,
    muscle: 42.1,
    water: 60.2,
  },
  {
    date: new Date("2025-01-03T00:00:00Z"),
    mass: 78.5,
    fat: 25.3,
    muscle: 42,
    water: 60,
  },
  {
    date: new Date("2025-01-04T00:00:00Z"),
    mass: 78,
    fat: 25.2,
    muscle: 41.8,
    water: 59.9,
  },
  {
    date: new Date("2025-01-05T00:00:00Z"),
    mass: 77.5,
    fat: 25,
    muscle: 41.7,
    water: 59.7,
  },
  {
    date: new Date("2025-01-06T00:00:00Z"),
    mass: 77,
    fat: 24.8,
    muscle: 41.5,
    water: 59.5,
  },
  {
    date: new Date("2025-01-07T00:00:00Z"),
    mass: 76.5,
    fat: 24.6,
    muscle: 41.4,
    water: 59.3,
  },
  {
    date: new Date("2025-01-08T00:00:00Z"),
    mass: 76,
    fat: 24.4,
    muscle: 41.2,
    water: 59.1,
  },
  {
    date: new Date("2025-01-09T00:00:00Z"),
    mass: 75.5,
    fat: 24.2,
    muscle: 41,
    water: 59,
  },
  {
    date: new Date("2025-01-10T00:00:00Z"),
    mass: 75,
    fat: 24,
    muscle: 40.8,
    water: 58.8,
  },
];

export default function Home() {
  const last7datapoints = mockedData.toSpliced(0, mockedData.length - 7);

  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-10 p-8">
      <header className="row-start-1 flex items-center gap-2 px-4 transition-[width,height] ease-linear">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Tracker</BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Home</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <main className="row-start-2 flex flex-wrap items-center gap-8 sm:items-start">
        <Chart
          chartData={last7datapoints}
          valueDataKey="mass"
          xAxisDataKey="date"
        />
        <Chart
          chartData={last7datapoints}
          valueDataKey="fat"
          xAxisDataKey="date"
        />
        <Chart
          chartData={last7datapoints}
          valueDataKey="muscle"
          xAxisDataKey="date"
        />
        <Chart
          chartData={last7datapoints}
          valueDataKey="water"
          xAxisDataKey="date"
        />
      </main>

      <footer className="row-start-3 flex flex-wrap items-center justify-center gap-6">
        Footer
      </footer>
    </div>
  );
}
