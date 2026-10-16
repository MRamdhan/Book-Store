export const FLUTTER_M3_CODE = `// ============================================================================
// WARM EDITORIAL BOOKSTORE - FLUTTER MATERIAL DESIGN 3 (ANDROID & WEB)
// ============================================================================
// File: lib/main.dart
// Dependencies in pubspec.yaml:
//   flutter:
//     sdk: flutter
//   google_fonts: ^6.1.0
// ============================================================================

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

void main() {
  runApp(const WarmEditorialBookstoreApp());
}

/// Material Design 3 Color Tokens
class BookstoreTheme {
  static const Color primary = Color(0xFF14422D); // Forest Cedar
  static const Color onPrimary = Color(0xFFFFFFFF);
  static const Color primaryContainer = Color(0xFF2D5A43);
  static const Color onPrimaryContainer = Color(0xFF9FCFB2);

  static const Color secondary = Color(0xFF974722); // Terracotta Amber
  static const Color onSecondary = Color(0xFFFFFFFF);
  static const Color secondaryContainer = Color(0xFFFF996C);
  static const Color onSecondaryContainer = Color(0xFF772F0A);

  static const Color surface = Color(0xFFFFF8F6); // Rich Vellum
  static const Color surfaceContainerLow = Color(0xFFFBF1EF);
  static const Color surfaceContainer = Color(0xFFF6ECEA); // Soft Parchment
  static const Color surfaceContainerHigh = Color(0xFFF0E6E4);
  static const Color onSurface = Color(0xFF1F1B1A); // Deep Espresso Ink
  static const Color onSurfaceVariant = Color(0xFF414943);
  static const Color outline = Color(0xFF717973);
  static const Color outlineVariant = Color(0xFFC0C9C1);

  static ThemeData get themeData {
    final colorScheme = ColorScheme(
      brightness: Brightness.light,
      primary: primary,
      onPrimary: onPrimary,
      primaryContainer: primaryContainer,
      onPrimaryContainer: onPrimaryContainer,
      secondary: secondary,
      onSecondary: onSecondary,
      secondaryContainer: secondaryContainer,
      onSecondaryContainer: onSecondaryContainer,
      surface: surface,
      onSurface: onSurface,
      surfaceContainerLowest: Colors.white,
      surfaceContainerLow: surfaceContainerLow,
      surfaceContainer: surfaceContainer,
      surfaceContainerHigh: surfaceContainerHigh,
      surfaceContainerHighest: const Color(0xFFEAE0DE),
      onSurfaceVariant: onSurfaceVariant,
      outline: outline,
      outlineVariant: outlineVariant,
      error: const Color(0xFFBA1A1A),
      onError: Colors.white,
    );

    return ThemeData(
      useMaterial3: true,
      colorScheme: colorScheme,
      scaffoldBackgroundColor: surface,
      textTheme: TextTheme(
        displayLarge: GoogleFonts.playfairDisplay(fontSize: 36, fontWeight: FontWeight.w600, color: onSurface),
        headlineMedium: GoogleFonts.playfairDisplay(fontSize: 24, fontWeight: FontWeight.w600, color: onSurface),
        headlineSmall: GoogleFonts.playfairDisplay(fontSize: 18, fontWeight: FontWeight.w500, color: onSurface),
        bodyLarge: GoogleFonts.plusJakartaSans(fontSize: 16, height: 1.6, color: onSurface),
        bodyMedium: GoogleFonts.plusJakartaSans(fontSize: 14, height: 1.5, color: onSurfaceVariant),
        bodySmall: GoogleFonts.plusJakartaSans(fontSize: 12, color: onSurfaceVariant),
        labelLarge: GoogleFonts.plusJakartaSans(fontSize: 14, fontWeight: FontWeight.w600, color: onSurface),
        labelSmall: GoogleFonts.plusJakartaSans(fontSize: 11, fontWeight: FontWeight.w700, letterSpacing: 0.8),
      ),
      navigationBarTheme: NavigationBarThemeData(
        backgroundColor: surfaceContainerLow,
        indicatorColor: primaryContainer,
        labelTextStyle: WidgetStateProperty.resolveWith((states) {
          if (states.contains(WidgetState.selected)) {
            return GoogleFonts.plusJakartaSans(fontSize: 12, fontWeight: FontWeight.w600, color: primary);
          }
          return GoogleFonts.plusJakartaSans(fontSize: 12, fontWeight: FontWeight.w500, color: onSurfaceVariant);
        }),
        iconTheme: WidgetStateProperty.resolveWith((states) {
          if (states.contains(WidgetState.selected)) {
            return const IconThemeData(color: Colors.white);
          }
          return const IconThemeData(color: onSurfaceVariant);
        }),
      ),
      cardTheme: CardTheme(
        color: surfaceContainerLow,
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(4),
          side: const BorderSide(color: outlineVariant, width: 0.8),
        ),
      ),
    );
  }
}

class WarmEditorialBookstoreApp extends StatelessWidget {
  const WarmEditorialBookstoreApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Warm Editorial Bookstore',
      debugShowCheckedModeBanner: false,
      theme: BookstoreTheme.themeData,
      home: const ResponsiveMainLayout(),
    );
  }
}

/// Adaptive Layout: Switch between NavigationBar (Mobile) and NavigationRail (Web/Tablet)
class ResponsiveMainLayout extends StatefulWidget {
  const ResponsiveMainLayout({super.key});

  @override
  State<ResponsiveMainLayout> createState() => _ResponsiveMainLayoutState();
}

class _ResponsiveMainLayoutState extends State<ResponsiveMainLayout> {
  int _selectedIndex = 0;
  final List<BookItem> _bag = [];

  void _addToBag(BookItem book) {
    setState(() {
      _bag.add(book);
    });
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        backgroundColor: BookstoreTheme.primary,
        content: Text('\${book.title} added to bag.', style: const TextStyle(color: Colors.white)),
        behavior: SnackBarBehavior.floating,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final isDesktop = MediaQuery.of(context).size.width >= 768;

    final pages = [
      DiscoverScreen(onAddToBag: _addToBag),
      const SalonScreen(),
      BagScreen(bagItems: _bag, onRemove: (b) => setState(() => _bag.remove(b))),
    ];

    if (isDesktop) {
      // Material Design 3 Web & Desktop: NavigationRail + Expanded Content
      return Scaffold(
        body: Row(
          children: [
            NavigationRail(
              backgroundColor: BookstoreTheme.surfaceContainerLow,
              selectedIndex: _selectedIndex,
              onDestinationSelected: (idx) => setState(() => _selectedIndex = idx),
              labelType: NavigationRailLabelType.all,
              leading: Padding(
                padding: const EdgeInsets.symmetric(vertical: 24.0),
                child: Text(
                  'SALON',
                  style: GoogleFonts.playfairDisplay(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                    letterSpacing: 2,
                    color: BookstoreTheme.primary,
                  ),
                ),
              ),
              destinations: [
                const NavigationRailDestination(
                  icon: Icon(Icons.menu_book_outlined),
                  selectedIcon: Icon(Icons.menu_book),
                  label: Text('Discover'),
                ),
                const NavigationRailDestination(
                  icon: Icon(Icons.local_cafe_outlined),
                  selectedIcon: Icon(Icons.local_cafe),
                  label: Text('Salon'),
                ),
                NavigationRailDestination(
                  icon: Badge(
                    isLabelVisible: _bag.isNotEmpty,
                    label: Text('\${_bag.length}'),
                    child: const Icon(Icons.shopping_bag_outlined),
                  ),
                  selectedIcon: const Icon(Icons.shopping_bag),
                  label: const Text('Bag'),
                ),
              ],
            ),
            const VerticalDivider(width: 1, thickness: 1, color: BookstoreTheme.outlineVariant),
            Expanded(child: pages[_selectedIndex]),
          ],
        ),
      );
    }

    // Material Design 3 Android Mobile: CenterAligned TopAppBar + NavigationBar
    return Scaffold(
      body: pages[_selectedIndex],
      bottomNavigationBar: NavigationBar(
        selectedIndex: _selectedIndex,
        onDestinationSelected: (idx) => setState(() => _selectedIndex = idx),
        destinations: [
          const NavigationDestination(
            icon: Icon(Icons.menu_book_outlined),
            selectedIcon: Icon(Icons.menu_book),
            label: 'Discover',
          ),
          const NavigationDestination(
            icon: Icon(Icons.local_cafe_outlined),
            selectedIcon: Icon(Icons.local_cafe),
            label: 'Salon',
          ),
          NavigationDestination(
            icon: Badge(
              isLabelVisible: _bag.isNotEmpty,
              label: Text('\${_bag.length}'),
              child: const Icon(Icons.shopping_bag_outlined),
            ),
            selectedIcon: const Icon(Icons.shopping_bag),
            label: 'Bag',
          ),
        ],
      ),
    );
  }
}

/// Data Model
class BookItem {
  final String title;
  final String author;
  final double price;
  final String format;
  final String category;
  final String quote;

  const BookItem({
    required this.title,
    required this.author,
    required this.price,
    required this.format,
    required this.category,
    required this.quote,
  });
}

final sampleBooks = [
  const BookItem(
    title: 'The Art of Stillness',
    author: 'Eliza Reed',
    price: 34.00,
    format: 'CLOTHBOUND',
    category: 'Philosophy',
    quote: 'True silence is not the absence of sound, but the presence of an attentive spirit.',
  ),
  const BookItem(
    title: 'Echoes of the Mediterranean',
    author: 'Sarah J. Alvarez & Leo D. Costas',
    price: 38.50,
    format: 'FIRST EDITION',
    category: 'Culture',
    quote: 'The sea teaches patience; the kiln teaches surrender to fire.',
  ),
  const BookItem(
    title: 'A Naturalist in Kyoto',
    author: 'Eliza J. Finch',
    price: 36.00,
    format: 'HARDCOVER',
    category: 'Essays',
    quote: 'To understand Kyoto moss is to understand eternity in dew drops.',
  ),
];

class DiscoverScreen extends StatelessWidget {
  final ValueChanged<BookItem> onAddToBag;
  const DiscoverScreen({super.key, required this.onAddToBag});

  @override
  Widget build(BuildContext context) {
    return CustomScrollView(
      slivers: [
        SliverAppBar.large(
          backgroundColor: BookstoreTheme.surface,
          title: Text(
            'The Literary Salon',
            style: GoogleFonts.playfairDisplay(fontWeight: FontWeight.w600),
          ),
          actions: [
            IconButton(icon: const Icon(Icons.search), onPressed: () {}),
            IconButton(icon: const Icon(Icons.filter_list), onPressed: () {}),
          ],
        ),
        SliverToBoxAdapter(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20.0, vertical: 12.0),
            child: Text(
              'CURATED HARDCOVER & CLOTHBOUND EDITIONS',
              style: Theme.of(context).textTheme.labelSmall?.copyWith(
                    color: BookstoreTheme.secondary,
                  ),
            ),
          ),
        ),
        SliverPadding(
          padding: const EdgeInsets.all(20),
          sliver: SliverGrid(
            gridDelegate: const SliverGridDelegateWithMaxCrossAxisExtent(
              maxCrossAxisExtent: 320,
              mainAxisExtent: 390,
              crossAxisSpacing: 16,
              mainAxisSpacing: 24,
            ),
            delegate: SliverChildBuilderDelegate(
              (context, index) {
                final book = sampleBooks[index % sampleBooks.length];
                return BookCardWidget(book: book, onAdd: () => onAddToBag(book));
              },
              childCount: sampleBooks.length,
            ),
          ),
        ),
      ],
    );
  }
}

class BookCardWidget extends StatelessWidget {
  final BookItem book;
  final VoidCallback onAdd;

  const BookCardWidget({super.key, required this.book, required this.onAdd});

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(
              child: Container(
                decoration: BoxDecoration(
                  color: BookstoreTheme.surfaceContainer,
                  borderRadius: BorderRadius.circular(4),
                ),
                child: Center(
                  child: Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Text(
                      book.title,
                      textAlign: TextAlign.center,
                      style: GoogleFonts.playfairDisplay(fontSize: 16, fontWeight: FontWeight.bold),
                    ),
                  ),
                ),
              ),
            ),
            const SizedBox(height: 12),
            Text(book.format, style: Theme.of(context).textTheme.labelSmall?.copyWith(color: BookstoreTheme.secondary)),
            const SizedBox(height: 4),
            Text(book.title, maxLines: 1, overflow: TextOverflow.ellipsis, style: Theme.of(context).textTheme.headlineSmall),
            Text(book.author, style: Theme.of(context).textTheme.bodySmall),
            const Spacer(),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text('$\${book.price.toStringAsFixed(2)}', style: GoogleFonts.plusJakartaSans(fontWeight: FontWeight.bold, color: BookstoreTheme.primary)),
                FilledButton.tonal(
                  style: FilledButton.styleFrom(
                    backgroundColor: BookstoreTheme.primary,
                    foregroundColor: Colors.white,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(4)),
                  ),
                  onPressed: onAdd,
                  child: const Text('Add to Bag'),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

class SalonScreen extends StatelessWidget {
  const SalonScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Literary Salon Circle')),
      body: Center(
        child: Text(
          'October Reading Salon Discussion\\n"Chapter III: The sensory dialogue between tactile print & digital cognition"',
          textAlign: TextAlign.center,
          style: GoogleFonts.playfairDisplay(fontSize: 18),
        ),
      ),
    );
  }
}

class BagScreen extends StatelessWidget {
  final List<BookItem> bagItems;
  final ValueChanged<BookItem> onRemove;

  const BagScreen({super.key, required this.bagItems, required this.onRemove});

  @override
  Widget build(BuildContext context) {
    final subtotal = bagItems.fold(0.0, (acc, item) => acc + item.price);

    return Scaffold(
      appBar: AppBar(title: const Text('Shopping Bag')),
      body: bagItems.isEmpty
          ? const Center(child: Text('Your literary bag is currently empty.'))
          : Column(
              children: [
                Expanded(
                  child: ListView.separated(
                    itemCount: bagItems.length,
                    separatorBuilder: (_, __) => const Divider(color: BookstoreTheme.outlineVariant),
                    itemBuilder: (context, index) {
                      final item = bagItems[index];
                      return ListTile(
                        title: Text(item.title, style: GoogleFonts.playfairDisplay()),
                        subtitle: Text(item.author),
                        trailing: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Text('$\${item.price.toStringAsFixed(2)}', style: const TextStyle(fontWeight: FontWeight.bold)),
                            IconButton(icon: const Icon(Icons.delete_outline), onPressed: () => onRemove(item)),
                          ],
                        ),
                      );
                    },
                  ),
                ),
                Container(
                  padding: const EdgeInsets.all(24),
                  decoration: const BoxDecoration(
                    color: BookstoreTheme.surfaceContainerLow,
                    border: Border(top: BorderSide(color: BookstoreTheme.outlineVariant)),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text('Subtotal'),
                          Text('$\${subtotal.toStringAsFixed(2)}', style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
                        ],
                      ),
                      FilledButton(
                        style: FilledButton.styleFrom(backgroundColor: BookstoreTheme.primary),
                        onPressed: () {},
                        child: const Text('Complete Purchase'),
                      ),
                    ],
                  ),
                ),
              ],
            ),
    );
  }
}
`;
