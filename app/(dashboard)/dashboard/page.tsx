import Link from "next/link";
import { ArrowRight, Phone, Wifi, Wallet, Settings2, PackageSearch } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function DashboardPage() {
  const actions = [
    {
      title: "Buy Airtime",
      description: "Top up any mobile number instantly across major networks.",
      href: "/buy/airtime",
      icon: Phone,
      color: "text-primary-deep",
    },
    {
      title: "Buy Data",
      description: "Purchase data bundles with clear pricing and fast delivery.",
      href: "/buy/data",
      icon: Wifi,
      color: "text-secondary-teal",
    },
    {
      title: "Fund Wallet",
      description: "Add funds to your wallet to enable seamless vending.",
      href: "/wallet",
      icon: Wallet,
      color: "text-secondary-muted",
    },
    {
      title: "View Wallet & History",
      description: "See your current balance and recent wallet transactions.",
      href: "/wallet",
      icon: PackageSearch,
      color: "text-primary-bright",
    },
    {
      title: "Manage Products",
      description: "Browse and review available airtime and data products.",
      href: "/products",
      icon: PackageSearch,
      color: "text-text-navy",
    },
    {
      title: "Account & Preferences",
      description: "Update your profile details and notification preferences.",
      href: "/settings",
      icon: Settings2,
      color: "text-text-navy",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        <header className="mb-10 md:mb-12">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-gray-500 mb-3">
            Dashboard
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold text-text-navy mb-3">
            What would you like to do today?
          </h1>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl">
            Use these quick actions to buy airtime or data, fund your wallet, or manage
            your DatabyNature account. No charts, just the essentials.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Link key={action.title} href={action.href}>
                <div className="group h-full rounded-2xl border border-gray-200 bg-white px-4 py-5 transition-transform transition-shadow duration-200 hover:-translate-y-1 hover:shadow-md cursor-pointer">
                  <div className="mb-4 flex items-center justify-between gap-2">
                    <div className={`rounded-full bg-gray-100 p-2 ${action.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-primary-deep group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <h2 className="mb-1 text-base font-semibold text-text-navy">
                    {action.title}
                  </h2>
                  <p className="mb-4 text-xs text-gray-600 leading-relaxed">
                    {action.description}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="px-0 text-xs text-primary-deep hover:text-primary-deep"
                  >
                    Open
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </Link>
            );
          })}
        </section>
      </div>
    </div>
  );
}

