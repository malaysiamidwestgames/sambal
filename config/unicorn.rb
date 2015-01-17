# Set full path to application
app_dir = File.expand_path('../../', __FILE__)
shared_dir = File.expand_path('../../../shared/', __FILE__)

# Set the working application directory
# working_directory "/path/to/your/app"
working_directory app_dir

# Unicorn PID file location
pid "#{shared_dir}/pids/unicorn.pid"

# Path to logs
stderr_path "#{shared_dir}/log/unicorn.stderr.log"
stdout_path "#{shared_dir}/log/unicorn.stdout.log"

# Unicorn socket
listen "#{shared_dir}/sockets/unicorn.sock"

# Number of processes
# worker_processes 4
worker_processes 2

preload_app true

# Time-out
timeout 30