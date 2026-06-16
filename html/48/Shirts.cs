namespace shirts
{
    internal class Program
    {
        static void Main(string[] args)
        {
            new Shirts();
        }

        public class Shirts {
        
            string pattern {  get; set; }
            string color { get; set; }
            public Shirts(string pattern, string color)
            {
                this.pattern = pattern;
                this.color = color;
            }
            public Shirts()
            {
               var shirts = MakeShirts();
                Print(shirts);
            }
            public List<Shirts> MakeShirts()
            {
                List<Shirts> shirts = new List<Shirts>();
                List<string> colors = new List<string>() { "white", "black", "blue" };
                List<string> patterns = new List<string>() { "plain", "striped", "plaid" };

                for (int i = 0; i < patterns.Count; i++)
                {
                   for (int j = 0; j < colors.Count; j++)
                    {
                        Shirts shirt = new Shirts(patterns[i], colors[j]);
                        shirts.Add(shirt);
                    }
                   
                }

                return shirts;
            }
            public void Print(List<Shirts> shirts)
            {
                foreach(var shirt in shirts)
                {
                    Console.WriteLine($"{shirt.pattern} {shirt.color}");
                }
            }
        }
    }
}
