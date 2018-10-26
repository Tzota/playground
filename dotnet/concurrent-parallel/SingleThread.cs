using System;
using System.Collections.Generic;

namespace concurrent_parallel
{
    class SingleThread: IWorker
    {
        public event EventHandler<PercentEventArgs> NotifyPercent;

        public Dictionary<string, int> DoWork(string[] data) {
            var result = new Dictionary<string, int>();
            byte percent = 0;

            for(int i = 0, total = 10; i < total; i++)
            {
                var line = data[i];
                HandleNotifications(i, total, ref percent);

                int count = 0;
                foreach(string cursor in data)
                {
                    if (cursor.IndexOf(line) >= 0)
                    {
                        count++;
                    }
                }

                if (count > 1 ) {
                    result.Add(line, count);
                }
            }

            return result;
        }

        private void HandleNotifications(int i, int total, ref byte percent)
        {
            byte n = Convert.ToByte((float)i / total * 100);
            if (n > percent) {
                if (NotifyPercent != null)
                {
                    NotifyPercent(this, new PercentEventArgs(percent));
                }
                percent = n;
            }
        }
    }
}
