import numpy as np
import pandas as pd
import json
from datetime import datetime, timedelta

# Configurazione delle variabili per Siracusa basate su Cucurbita pepo
monthly_temp_means = [11.6, 12.5, 14.3, 17.2, 21.2, 25.2, 27.4, 27.3, 24.4, 20.0, 15.5, 12.3]  # Temperatura media mensile in °C
monthly_rain_means = [63, 52, 46, 36, 19, 6, 3, 6, 23, 62, 95, 89]  # Precipitazioni medie mensili in mm
humidity_mean = 70  # Umidità media annuale in %
humidity_std = 10   # Deviazione standard dell'umidità

# Configurazione produzione zucchine
avg_yield_per_plant = 4.5  # Resa media in kg per pianta
yield_std_per_plant = 1.5  # Deviazione standard della resa per pianta
plants_per_hectare = 3000  # Numero di piante per ettaro
growth_time_mean = 30  # Tempo medio di crescita in giorni
growth_time_std = 5    # Deviazione standard del tempo di crescita

# Funzione per calcolare la riduzione della resa in base alle condizioni
def adjust_yield(temperature, rainfall, humidity):
    yield_factor = 1.0

    # Penalità per temperature fuori dall'intervallo ottimale
    if temperature < 15 or temperature > 35:
        yield_factor *= 0.5  # Dimezza la resa

    # Penalità per precipitazioni eccessive o insufficienti
    if rainfall < 20:
        yield_factor *= 0.7  # Resa ridotta del 30%
    elif rainfall > 100:
        yield_factor *= 0.8  # Resa ridotta del 20%

    # Penalità per umidità eccessiva
    if humidity > 80:
        yield_factor *= 0.9  # Resa ridotta del 10%

    return yield_factor

# Generazione dei dati giornalieri
def generate_daily_data(year, num_fields=1):
    data = []

    start_date = datetime(year, 1, 1)
    end_date = datetime(year, 12, 31)
    delta = timedelta(days=1)

    current_date = start_date
    while current_date <= end_date:
        month = current_date.month
        temp_mean = monthly_temp_means[month - 1]
        rain_mean = monthly_rain_means[month - 1]

        for field_id in range(1, num_fields + 1):
            # Genera dati giornalieri
            temperature = np.random.normal(temp_mean, 2)  # Deviazione standard di ±2°C
            rainfall = max(0, np.random.normal(rain_mean, 10))  # Deviazione standard di ±10mm
            humidity = np.random.normal(humidity_mean, humidity_std)

            # Calcola il fattore di resa
            yield_factor = adjust_yield(temperature, rainfall, humidity)

            # Produzione specifica per campo
            daily_yield = max(
                0, 
                np.random.normal(avg_yield_per_plant * plants_per_hectare / 30, yield_std_per_plant * plants_per_hectare / 30)
            ) * yield_factor

            # Tempo di crescita casuale
            growth_time = max(0, np.random.normal(growth_time_mean, growth_time_std))

            # Aggiungi i dati
            data.append({
                "date": current_date.strftime('%Y-%m-%d'),
                "temperature": round(temperature, 2),
                "humidity": round(humidity, 2),
                "rainfall": round(rainfall, 2),
                "yield_kg": round(daily_yield, 2),
                "growth_time_days": round(growth_time, 2),
            })

        current_date += delta

    return data

# Simulazione per un anno intero
year = 2024
simulated_data = generate_daily_data(year)

print(simulated_data)
