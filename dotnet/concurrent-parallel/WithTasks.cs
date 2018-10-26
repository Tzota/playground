using System;
using System.Linq;
using System.Collections.Generic;
using System.Collections.Concurrent;
using System.Threading.Tasks;

namespace concurrent_parallel
{
    class WithTasks: IWorker
    {
        public event EventHandler<PercentEventArgs> NotifyPercent;

        public Dictionary<string, int> DoWork(string[] data) {
            var result = new ConcurrentDictionary<string, int>();

            for(int i = 0, total = 10; i < total; i++)
            {
                var line = data[i];
                NotifyPercent(this, new PercentEventArgs( Convert.ToByte(i * 100 / total)));

                int quarter = data.Length / 4;

                Task.WaitAll(new [] {
                    Task.Run(() => RunSubtask(0, quarter, data, line, result)),
                    Task.Run(() => RunSubtask(1 * quarter, quarter, data, line, result)),
                    Task.Run(() => RunSubtask(2 * quarter, quarter, data, line, result)),
                    Task.Run(() => RunSubtask(3 * quarter, quarter, data, line, result)),
                });
            }

            return result.ToDictionary(p => p.Key, p => p.Value);
        }

        private void RunSubtask(int skip, int take, IEnumerable<string> data, string line, ConcurrentDictionary<string, int> result)
        {
                int count = 0;
                foreach(string cursor in data.Skip(skip).Take(take))
                {
                    if (cursor.IndexOf(line) >= 0)
                    {
                        count++;
                    }
                }

                if (count > 1 ) {
                    result.TryAdd(line, count);
                }
        }
    }
}
