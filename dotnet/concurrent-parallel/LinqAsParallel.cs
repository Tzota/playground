using System;
using System.Linq;
using System.Collections.Generic;

namespace concurrent_parallel
{
    class LinqAsParallel: IWorker
    {
        public event EventHandler<PercentEventArgs> NotifyPercent;

        public Dictionary<string, int> DoWork(string[] data) {
            var result = new Dictionary<string, int>();

            for(int i = 0, total = 10; i < total; i++)
            {
                var line = data[i];
                NotifyPercent(this, new PercentEventArgs( Convert.ToByte(i * 100 / total)));

                int count = data
                    .AsParallel()
                    .Count(cursor => cursor.IndexOf(line) >= 0);

                if (count > 1 ) {
                    result.Add(line, count);
                }
            }

            return result;
        }
    }
}
