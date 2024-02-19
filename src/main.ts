interface Reserva {
  tipoHabitacion: "standard" | "suite";
  pax: number;
  noches: number;
}

const reservas: Reserva[] = [
  {
    tipoHabitacion: "standard",
    pax: 1,
    noches: 3,
  },
  {
    tipoHabitacion: "standard",
    pax: 1,
    noches: 4,
  },
  {
    tipoHabitacion: "suite",
    pax: 2,
    noches: 1,
  },
];

// CASO 1

class CalculadoraReservas {
  reservas: Reserva[];

  constructor(reservas: Reserva[]) {
    this.reservas = reservas;
  }

  calcularCargosAdicionales(reserva: Reserva): number {
    const personasAdicionales = reserva.pax > 1 ? reserva.pax - 1 : 0;
    const cargosAdicionales = personasAdicionales * 40 * reserva.noches;
    return cargosAdicionales;
  }

  calcularPrecioReserva(reserva: Reserva): number {
    let precioBase = reserva.tipoHabitacion === "standard" ? 100 : 150;
    precioBase *= reserva.noches;
    precioBase += this.calcularCargosAdicionales(reserva);
    return precioBase;
  }

  calcularSubtotal(): number {
    let subtotal = 0;
    for (const reserva of this.reservas) {
      subtotal += this.calcularPrecioReserva(reserva);
    }
    return subtotal;
  }

  calcularTotal(): number {
    const subtotal = this.calcularSubtotal();
    const iva = subtotal * 0.21;
    const total = subtotal + iva;
    return total;
  }
}

const calculadoraClienteParticular = new CalculadoraReservas(reservas);
console.log(
  "Subtotal (Cliente Particular): ",
  calculadoraClienteParticular.calcularSubtotal(),
  "€"
);
console.log(
  "Total (Clienta Particular): ",
  calculadoraClienteParticular.calcularTotal(),
  "€"
);

// CASO 2

class CalculadoraReservasTourOperador extends CalculadoraReservas {
  calcularSubtotal(): number {
    const precioHabitacion = 100;
    let totalNoches = 0;

    for (const reserva of this.reservas) {
      totalNoches += reserva.noches;
    }

    const totalSinDescuento = totalNoches * precioHabitacion;
    const descuento = totalSinDescuento * 0.15;
    const subtotal = totalSinDescuento - descuento;
    return subtotal;
  }
  calcularTotal(): number {
    const subtotal = this.calcularSubtotal();
    const iva = subtotal * 0.21;
    const total = subtotal + iva;
    return total;
  }
}

const calculadoraTourOperador = new CalculadoraReservasTourOperador(reservas);
console.log(
  "Subtotal (Tour Operador):",
  calculadoraTourOperador.calcularSubtotal(),
  "€"
);
console.log(
  "Total (Tour Operador):",
  calculadoraTourOperador.calcularTotal(),
  "€"
);

// Reservas base + hijas

class CalculadoraReservasBase {
  preciosHabitaciones: { [tipoHabitación: string]: number };

  constructor(preciosHabitaciones: { [tipoHabitacion: string]: number }) {
    this.preciosHabitaciones = preciosHabitaciones;
  }

  calcularCargosAdicionales(reserva: Reserva): number {
    const personasAdicionales = reserva.pax > 1 ? reserva.pax - 1 : 0;
    const cargosAdicionales = personasAdicionales * 40 * reserva.noches;
    return cargosAdicionales;
  }

  calcularPrecioReserva(reserva: Reserva): number {
    const precioBase = this.preciosHabitaciones[reserva.tipoHabitacion] || 0;
    const precioTotal = precioBase * reserva.noches;
    const cargosAdicionales = this.calcularCargosAdicionales(reserva);
    return precioTotal + cargosAdicionales;
  }

  calcularSubtotal(reservas: Reserva[]): number {
    let subtotal = 0;
    for (const reserva of reservas) {
      subtotal += this.calcularPrecioReserva(reserva);
    }
    return subtotal;
  }

  calcularTotal(reservas: Reserva[]): number {
    const subtotal = this.calcularSubtotal(reservas);
    const iva = subtotal * 0.21;
    const total = subtotal + iva;
    return total;
  }
}

class CalculadoraBaseClienteParticular extends CalculadoraReservasBase {
  constructor() {
    super({
      standard: 100,
      suite: 150,
    });
  }
}

class CalculadoraBaseTourOperador extends CalculadoraReservasBase {
  constructor() {
    super({
      standard: 100,
      suite: 100,
    });
  }

  calcularSubtotal(reservas: Reserva[]): number {
    let totalNoches = 0;

    for (const reserva of reservas) {
      totalNoches += reserva.noches;
    }

    const precioHabitacion = 100;
    const totalSinDescuento = totalNoches * precioHabitacion;
    const descuento = totalSinDescuento * 0.15;
    const subtotal = totalSinDescuento - descuento;
    return subtotal;
  }
}
const calculadoraBaseClienteParticular = new CalculadoraBaseClienteParticular();
console.log(
  "Subtotal (Cliente Particular calc.base): ",
  calculadoraBaseClienteParticular.calcularSubtotal(reservas)
);
console.log(
  "Total (Cliente Particular calc.base): ",
  calculadoraBaseClienteParticular.calcularTotal(reservas)
);

const calculadoraBaseTourOperador = new CalculadoraBaseTourOperador();
console.log(
  "Subtotal (Tour Operador calc.base): ",
  calculadoraBaseTourOperador.calcularSubtotal(reservas)
);
console.log(
  "Total (Tour Operador calc.base): ",
  calculadoraBaseTourOperador.calcularTotal(reservas)
);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
interface ReservaDesayuno {
  tipoHabitacion: "standard" | "suite";
  desayuno: boolean;
  pax: number;
  noches: number;
}

const reservasDesayuno: ReservaDesayuno[] = [
  {
    tipoHabitacion: "standard",
    desayuno: false,
    pax: 1,
    noches: 3,
  },
  {
    tipoHabitacion: "standard",
    desayuno: false,
    pax: 1,
    noches: 4,
  },
  {
    tipoHabitacion: "suite",
    desayuno: true,
    pax: 2,
    noches: 1,
  },
];

class CalculadoraReservasBaseDesayuno {
  preciosHabitaciones: { [tipoHabitación: string]: number };
  precioDesayuno: number;

  constructor(
    preciosHabitaciones: { [tipoHabitacion: string]: number },
    precioDesayuno: number
  ) {
    this.preciosHabitaciones = preciosHabitaciones;
    this.precioDesayuno = precioDesayuno;
  }

  calcularCargosAdicionales(reserva: ReservaDesayuno): number {
    const personasAdicionales = reserva.pax > 1 ? reserva.pax - 1 : 0;
    const cargosAdicionalesPersonas = personasAdicionales * 40 * reserva.noches;
    const cargosAdicionalesDesayuno = reserva.desayuno
      ? this.precioDesayuno * reserva.pax * reserva.noches
      : 0;
    const cargosAdicionalesTotales =
      cargosAdicionalesPersonas + cargosAdicionalesDesayuno;
    return cargosAdicionalesTotales;
  }

  calcularPrecioReserva(reserva: ReservaDesayuno): number {
    const precioBase = this.preciosHabitaciones[reserva.tipoHabitacion] || 0;
    const precioTotal = precioBase * reserva.noches;
    const cargosAdicionales = this.calcularCargosAdicionales(reserva);
    return precioTotal + cargosAdicionales;
  }

  calcularSubtotal(reservas: ReservaDesayuno[]): number {
    let subtotal = 0;
    for (const reserva of reservas) {
      subtotal += this.calcularPrecioReserva(reserva);
    }
    return subtotal;
  }

  calcularTotal(reservas: ReservaDesayuno[]): number {
    const subtotal = this.calcularSubtotal(reservas);
    const iva = subtotal * 0.21;
    const total = subtotal + iva;
    return total;
  }
}

class CalculadoraBaseClienteParticularDesayuno extends CalculadoraReservasBaseDesayuno {
  constructor() {
    super(
      {
        standard: 100,
        suite: 150,
      },
      15
    );
  }
}

class CalculadoraBaseTourOperadorDesayuno extends CalculadoraReservasBaseDesayuno {
  constructor() {
    super(
      {
        standard: 100,
        suite: 100,
      },
      15
    );
  }

  calcularSubtotal(reservas: ReservaDesayuno[]): number {
    let totalNoches = 0;

    for (const reserva of reservas) {
      totalNoches += reserva.noches;
    }

    const precioHabitacion = 100;
    const totalSinDescuento = totalNoches * precioHabitacion;
    const descuento = totalSinDescuento * 0.15;
    const subtotal = totalSinDescuento - descuento;
    return subtotal;
  }
}

const calculadoraBaseClienteParticularDesayuno =
  new CalculadoraBaseClienteParticularDesayuno();
console.log(
  "Subtotal (Cliente Particular calc.base.desayuno): ",
  calculadoraBaseClienteParticularDesayuno.calcularSubtotal(reservasDesayuno)
);
console.log(
  "Total (Cliente Particular calc.base.desayuno): ",
  calculadoraBaseClienteParticularDesayuno.calcularTotal(reservasDesayuno)
);

const calculadoraBaseTourOperadorDesayuno =
  new CalculadoraBaseTourOperadorDesayuno();
console.log(
  "Subtotal (Tour Operador calc.base.desayuno): ",
  calculadoraBaseTourOperadorDesayuno.calcularSubtotal(reservasDesayuno)
);
console.log(
  "Total (Tour Operador calc.base.desayuno): ",
  calculadoraBaseTourOperadorDesayuno.calcularTotal(reservasDesayuno)
);
