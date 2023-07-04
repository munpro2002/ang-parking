export interface Parkingrevenue {
  fseated: {
    in: number;
    out: number;
    revenue: number;
  };
  sseated: {
    in: number;
    out: number;
    revenue: number;
  };
  truck: {
    in: number;
    out: number;
    revenue: number;
  };
}

export const parkingRevenueBaseValue: Parkingrevenue = {
  fseated: {
    in: 0,
    out: 0,
    revenue: 0,
  },
  sseated: {
    in: 0,
    out: 0,
    revenue: 0,
  },
  truck: {
    in: 0,
    out: 0,
    revenue: 0,
  },
};
