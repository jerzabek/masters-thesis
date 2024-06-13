import pandas as pd
import matplotlib.pyplot as plt
import argparse


def plot_errors_per_interval(data):
    start_time = data['timeStamp'].min()

    # Pretvori timeStamp u sekunde od početka
    data['timeStamp_seconds'] = (data['timeStamp'] - start_time) / 1000

    # Grupiranje po sekundama i računanje prosjeka grešaka po sekundi
    errors_per_second = data.groupby(data['timeStamp_seconds'].astype(int))[
        'success'].apply(lambda x: (x == False).sum()).fillna(0)

    # Priprema podataka za graf
    seconds = errors_per_second.index
    error_counts = errors_per_second.values

    plt.figure(figsize=(12, 6))
    plt.plot(seconds, error_counts, marker='o', linestyle='-')
    plt.xlabel('Vrijeme od početka (sekunde)')
    plt.ylabel('Broj grešaka')
    plt.title('Broj neuspješnih zahtjeva po sekundi')
    plt.grid(True)
    plt.show()


def plot_avg_latency_per_second(data):
    # Pronađi najmanji timeStamp kao početak vremena
    start_time = data['timeStamp'].min()

    # Pretvori timeStamp u sekunde od početka
    data['timeStamp_seconds'] = (data['timeStamp'] - start_time) / 1000

    # Grupiranje po sekundama i izračun prosjeka latencije po sekundi
    avg_latency_per_second = data.groupby(data['timeStamp_seconds'].astype(int))[
        'Latency'].mean().fillna(0)

    # Priprema podataka za graf
    seconds = avg_latency_per_second.index
    latency_values = avg_latency_per_second.values

    plt.figure(figsize=(12, 6))
    plt.plot(seconds, latency_values, marker='o', linestyle='-')
    plt.xlabel('Vrijeme od početka (sekunde)')
    plt.ylabel('Prosječno vrijeme odaziva (ms)')
    plt.title('Prosječno vrijeme odaziva po sekundi')
    plt.grid(True)
    plt.show()


def plot_errors_and_avg_latency(data):
    start_time = data['timeStamp'].min()

    # Pretvori timeStamp u sekunde od početka
    data['timeStamp_seconds'] = (data['timeStamp'] - start_time) / 1000

    # Grupiranje po sekundama i računanje prosjeka grešaka po sekundi
    errors_per_second = data.groupby(data['timeStamp_seconds'].astype(int))[
        'success'].apply(lambda x: (x == False).sum()).fillna(0)

    # Računanje prosjeka latencije po sekundi
    avg_latency_per_second = data.groupby(data['timeStamp_seconds'].astype(int))[
        'Latency'].mean().fillna(0)

    # Priprema podataka za graf
    seconds = errors_per_second.index
    error_counts = errors_per_second.values
    latency_values = avg_latency_per_second.values

    # Crtanje oba grafa na istom plotu s desnom osi
    fig, ax1 = plt.subplots(figsize=(12, 6))

    # Graf prosječne latencije (lijeva os)
    ax1.plot(seconds, latency_values, marker='o', linestyle='-',
             label='Prosječno vrijeme odaziva (ms)', color='blue')
    ax1.set_xlabel('Vrijeme od početka (sekunde)')
    ax1.set_ylabel('Prosječno vrijeme odaziva (ms)', color='blue')
    ax1.tick_params(axis='y', labelcolor='blue')
    ax1.grid(True, color='blue', linestyle='--')

    # Desna os za broj grešaka
    ax2 = ax1.twinx()
    ax2.plot(seconds, error_counts, marker='o',
             linestyle='-', label='Broj grešaka', color='red')
    ax2.set_ylabel('Broj grešaka', color='red')
    ax2.tick_params(axis='y', labelcolor='red')
    ax2.grid(True, color='red', linestyle='--')

    # Dodavanje legendi
    lines1, labels1 = ax1.get_legend_handles_labels()
    lines2, labels2 = ax2.get_legend_handles_labels()
    ax1.legend(lines1 + lines2, labels1 + labels2, loc='best')

    plt.title('Broj neuspješnih zahtjeva i prosječno vrijeme odaziva po sekundi')
    plt.show()


def main():
    parser = argparse.ArgumentParser(
        description='Parsiranje rezultata testiranja skalabilnosti poslužitelja.')
    parser.add_argument('file_path', type=str, help='Putanja do CSV datoteke')
    parser.add_argument('--graph', choices=['errors', 'latency', 'both'], default='errors',
                        help='Odredi koji grafikon treba nacrtati (pogreške, latencija ili kombinacija oba)')
    args = parser.parse_args()

    file_path = args.file_path

    data = pd.read_csv(file_path, delimiter=',')

    if args.graph == 'errors':
        plot_errors_per_interval(data)
    elif args.graph == 'latency':
        plot_avg_latency_per_second(data)
    elif args.graph == 'both':
        plot_errors_and_avg_latency(data)


if __name__ == "__main__":
    main()
