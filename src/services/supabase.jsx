
import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://hrglxzserzmbrsifiylo.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhyZ2x4enNlcnptYnJzaWZpeWxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI0MjY2NzQsImV4cCI6MjAyODAwMjY3NH0.IbOs7oBMbPJYRAHOYvBSLC-yr0_ZQAU-XJeMUhJzAB4'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;